import { Inject, Service } from 'typedi';
import { Knex } from 'knex';
import {
  ICustomer,
  ISaleInvoice,
  ISaleInvoiceCreateDTO,
  ISaleInvoiceCreatedPayload,
  ISaleInvoiceCreatingPaylaod,
  ITenantUser,
  IItemEntryDTO,
  IProjectTaskGetPOJO,
} from '@/interfaces';
import events from '@/subscribers/events';
import TenancyService from '@/services/Tenancy/TenancyService';
import ItemsEntriesService from '@/services/Items/ItemsEntriesService';
import UnitOfWork from '@/services/UnitOfWork';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import { CommandSaleInvoiceValidators } from './CommandSaleInvoiceValidators';
import { CommandSaleInvoiceDTOTransformer } from './CommandSaleInvoiceDTOTransformer';
import { SaleEstimateValidators } from '../Estimates/SaleEstimateValidators';
import { ProjectBillableTask } from '@/services/Projects/Projects/ProjectBillableTasks';
import { ProjectLinkRefType } from '@/interfaces';
import { GetTasksService } from '@/services/Projects/Tasks/GetTasks';
import moment from 'moment';

@Service()
export class CreateSaleInvoice {
  @Inject()
  private tenancy: TenancyService;

  @Inject()
  private itemsEntriesService: ItemsEntriesService;

  @Inject()
  private projectBillableTask: ProjectBillableTask;

  @Inject()
  private validators: CommandSaleInvoiceValidators;

  @Inject()
  private transformerDTO: CommandSaleInvoiceDTOTransformer;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private commandEstimateValidators: SaleEstimateValidators;

  @Inject()
  private getTasksService: GetTasksService;

  /**
   * Creates a new sale invoices and store it to the storage
   * with associated to entries and journal transactions.
   * @async
   * @param {number} tenantId - Tenant id.
   * @param {ISaleInvoice} saleInvoiceDTO - Sale invoice object DTO.
   * @param {ITenantUser} authorizedUser - The authorized user creating the invoice.
   * @param {Knex.Transaction} [trx] - Optional transaction instance.
   * @param {boolean} [skipTaskHoursUpdate=false] - When true, task hours will not be deducted when creating the invoice.
   * @return {Promise<ISaleInvoice>}
   */
  public createSaleInvoice = async (
    tenantId: number,
    saleInvoiceDTO: ISaleInvoiceCreateDTO,
    authorizedUser: ITenantUser,
    trx?: Knex.Transaction,
    skipTaskHoursUpdate: boolean = false
  ): Promise<ISaleInvoice> => {
    console.log("saleInvoiceDTO", saleInvoiceDTO);
    const { SaleInvoice, SaleEstimate, Contact, Task } = this.tenancy.models(tenantId);

    // If creating invoice for a project, check if project already has an invoice
    // if (saleInvoiceDTO.projectId) {
    //   const existingInvoice = await SaleInvoice.query()
    //     .where('projectId', saleInvoiceDTO.projectId)
    //     .first();
      
    //   if (existingInvoice) {
    //     throw new Error(`Project already has an invoice (#${existingInvoice.invoiceNo}). Only one invoice per project is allowed.`);
    //   }
    // }

    // Validate customer existance.
    const customer = await Contact.query()
      .modify('customer')
      .findById(saleInvoiceDTO.customerId)
      .throwIfNotFound();

    // If projectId exists, we need to transform the entries to include project reference
    if (saleInvoiceDTO.projectId) {
      // Use GetTasksService to fetch tasks
      const tasks: IProjectTaskGetPOJO[] = await this.getTasksService.getTasks(
        tenantId,
        saleInvoiceDTO.projectId
      );
      
      console.log("Original entries:", JSON.stringify(saleInvoiceDTO.entries));
      console.log("Available tasks:", JSON.stringify(tasks));
      
      // Transform entries to include project reference for tasks
      saleInvoiceDTO.entries = saleInvoiceDTO.entries.map(entry => {
        // Handle entries that should be tasks
        // Case 1: Description starts with "Task - "
        if (entry.description?.startsWith('Task - ')) {
          let task = null;
          const taskNamePart = entry.description.substring(7).trim(); // Remove 'Task - ' prefix
          
          // Special case: If the description is just "Task - " with no specific task name
          if (!taskNamePart && tasks.length === 1) {
            task = tasks[0];
            console.log("Using the only available task:", task.name);
          } else if (!taskNamePart && tasks.length > 1) {
            task = tasks.find(t => t.id === entry.itemId);
            console.log("Matching by itemId:", entry.itemId, "Found task:", task?.name || "None");
          } else {
            task = tasks.find(t => 
              t.name === taskNamePart || 
              entry.description === `Task - ${t.name}` ||
              (taskNamePart && t.name.includes(taskNamePart))
            );
          }
          
          if (task) {
            console.log("Found matching task:", task.name, "for entry:", entry.description);
            return {
              ...entry,
              description: `Task - ${task.name}`,
              projectRefId: task.id,
              projectRefType: ProjectLinkRefType.Task,
              itemId: null
            };
          } else {
            console.log("WARNING: No matching task found for:", entry.description);
          }
        }
        // Handle expense entries
        else if (entry.description?.startsWith('Expense - ')) {
          console.log("Processing expense entry:", entry);
          return {
            ...entry,
            itemId: null, // Clear itemId for expenses just like tasks
            projectRefType: ProjectLinkRefType.Expense
          };
        }
        // Case 2: Entry with itemId that matches a task id
        else if (entry.itemId && !entry.description) {
          const task = tasks.find(t => t.id === entry.itemId);
          if (task) {
            console.log("Found task matching itemId:", entry.itemId);
            return {
              ...entry,
              description: `Task - ${task.name}`,
              projectRefId: task.id,
              projectRefType: ProjectLinkRefType.Task,
              itemId: null
            };
          }
        }
        
        console.log("Regular item entry:", entry);
        return entry;
      });
      
      console.log("Transformed entries:", JSON.stringify(saleInvoiceDTO.entries));
    }

    // Validate the from estimate id exists on the storage.
    if (saleInvoiceDTO.fromEstimateId) {
      const fromEstimate = await SaleEstimate.query()
        .findById(saleInvoiceDTO.fromEstimateId)
        .throwIfNotFound();

      // Validate the sale estimate is not already converted to invoice.
      this.commandEstimateValidators.validateEstimateNotConverted(fromEstimate);
    }
    // Validate entries based on their type (items or tasks)
    const itemEntries = saleInvoiceDTO.entries.filter(
      entry => !entry.projectRefType || 
        (entry.projectRefType !== ProjectLinkRefType.Task && 
         entry.projectRefType !== ProjectLinkRefType.Expense)
    );
    const taskEntries = saleInvoiceDTO.entries.filter(
      entry => entry.projectRefType === ProjectLinkRefType.Task
    );
    console.log("taskEntries", taskEntries);
    const expenseEntries = saleInvoiceDTO.entries.filter(
      entry => entry.projectRefType === ProjectLinkRefType.Expense
    );

    console.log("Item entries to validate:", JSON.stringify(itemEntries));
    console.log("Task entries:", JSON.stringify(taskEntries));
    console.log("Expense entries:", JSON.stringify(expenseEntries));

    // Validate items if there are any item entries WITH itemId
    if (itemEntries.length > 0) {
      await this.itemsEntriesService.validateItemsIdsExistance(
        tenantId,
        itemEntries
      );
      await this.itemsEntriesService.validateNonSellableEntriesItems(
        tenantId,
        itemEntries
      );
    }

    // Re-fetch tasks using Task model for the second validation block
    // or adjust the second validation block to use the already fetched tasks
    if (taskEntries.length > 0) {
      // OPTION 1: Re-fetch using Task model (simpler if fields differ greatly)
      const taskIds = taskEntries.map(entry => entry.projectRefId);
      const tasksFromDb = await Task.query()
         .whereIn('id', taskIds)
         .where('projectId', saleInvoiceDTO.projectId);

      if (tasksFromDb.length !== taskIds.length) {
         throw new Error('Some referenced tasks do not exist or do not belong to the project');
      }

      // Validate that tasks are not over-invoiced using tasksFromDb
      // for (const task of tasksFromDb) {
      //    const taskEntry = taskEntries.find(e => e.projectRefId === task.id);
      //    const billableHoursRemaining = task.billableHours - task.invoicedHours;
        
      //    if (taskEntry.quantity > billableHoursRemaining) {
      //      throw new Error(
      //        `Task "${task.name}" cannot be invoiced for more than its remaining billable hours (${billableHoursRemaining})`
      //      );
      //    }
      // }

      // OPTION 2: Use tasks fetched from GetTasksService (preferred if IProjectTaskGetPOJO has needed fields)
      // const tasks = await this.getTasksService.getTasks(tenantId, saleInvoiceDTO.projectId);
      // const relevantTasks = tasks.filter(t => taskEntries.some(e => e.projectRefId === t.id));

      // if (relevantTasks.length !== taskEntries.length) {
      //   throw new Error('Some referenced tasks do not exist or do not belong to the project');
      // }
      // // Validate that tasks are not over-invoiced using relevantTasks
      // for (const task of relevantTasks) {
      //    const taskEntry = taskEntries.find(e => e.projectRefId === task.id);
      //    const billableHoursRemaining = task.billableHours - task.invoicedHours;
      //   
      //    if (taskEntry.quantity > billableHoursRemaining) {
      //      throw new Error(
      //        `Task "${task.name}" cannot be invoiced for more than its remaining billable hours (${billableHoursRemaining})`
      //      );
      //    }
      // }
    }

    // Transform DTO object to model object.
    const saleInvoiceObj = await this.transformCreateDTOToModel(
      tenantId,
      customer,
      saleInvoiceDTO,
      authorizedUser
    );
    console.log("saleInvoiceObj",saleInvoiceObj)
    // Validate sale invoice number uniquiness.
    if (saleInvoiceObj.invoiceNo) {
      await this.validators.validateInvoiceNumberUnique(
        tenantId,
        saleInvoiceObj.invoiceNo
      );
    }
    // Creates a new sale invoice and associated transactions under unit of work env.
    return this.uow.withTransaction(
      tenantId,
      async (trx: Knex.Transaction) => {
        // Triggers `onSaleInvoiceCreating` event.
        await this.eventPublisher.emitAsync(events.saleInvoice.onCreating, {
          saleInvoiceDTO,
          tenantId,
          trx,
        } as ISaleInvoiceCreatingPaylaod);

        // If invoice is created from project, set deliveredAt
        if (saleInvoiceDTO.projectId) {
          saleInvoiceObj.deliveredAt = moment().format('YYYY-MM-DD HH:mm:ss');
        }

        // Create sale invoice graph to the storage.
        const saleInvoice = await SaleInvoice.query(trx).upsertGraph(
          saleInvoiceObj
        );

        // Update task invoiced hours if not skipped
        if (!skipTaskHoursUpdate) {
          console.log("Updating task invoiced hours");
          for (const entry of taskEntries) {
            console.log("entry", entry);
            await this.projectBillableTask.increaseInvoicedTask(
              tenantId,
              entry.projectRefId,
              entry.quantity,
              trx
            );
          }
        }

        const eventPayload: ISaleInvoiceCreatedPayload = {
          tenantId,
          saleInvoice,
          saleInvoiceDTO,
          saleInvoiceId: saleInvoice.id,
          authorizedUser,
          trx,
        };
        // Triggers the event `onSaleInvoiceCreated`.
        // await this.eventPublisher.emitAsync(
        //   events.saleInvoice.onCreated,
        //   eventPayload
        // );
        return saleInvoice;
      },
      trx
    );
  };

  /**
   * Transformes create DTO to model.
   * @param {number} tenantId -
   * @param {ICustomer} customer -
   * @param {ISaleInvoiceCreateDTO} saleInvoiceDTO -
   */
  private transformCreateDTOToModel = async (
    tenantId: number,
    customer: ICustomer,
    saleInvoiceDTO: ISaleInvoiceCreateDTO,
    authorizedUser: ITenantUser
  ) => {
    // Separate entries by type for transformation
    const taskEntries = saleInvoiceDTO.entries.filter(
      entry => entry.projectRefType === ProjectLinkRefType.Task
    );
    const expenseEntries = saleInvoiceDTO.entries.filter(
      entry => entry.projectRefType === ProjectLinkRefType.Expense
    );
    const regularEntries = saleInvoiceDTO.entries.filter(
      entry => !entry.projectRefType || 
        (entry.projectRefType !== ProjectLinkRefType.Task && 
         entry.projectRefType !== ProjectLinkRefType.Expense)
    );
    
    console.log("Task entries for transform:", taskEntries.length);
    console.log("Expense entries for transform:", expenseEntries.length);
    console.log("Regular entries for transform:", regularEntries.length);
    
    // Transform regular entries using the standard transformer
    const regularInvoiceDTO = {
      ...saleInvoiceDTO,
      entries: regularEntries
    };
    
    let saleInvoiceObj;
    if (regularEntries.length > 0) {
      saleInvoiceObj = await this.transformerDTO.transformDTOToModel(
        tenantId,
        customer,
        regularInvoiceDTO,
        authorizedUser
      );
    } else {
      // Get a basic invoice structure
      const { Account } = this.tenancy.models(tenantId);
      const incomeAccount = await Account.query()
        .where('name', 'like', '%Service Income%')
        .orWhere('name', 'like', '%Sales%')
        .first();
        
      const incomeAccountId = incomeAccount?.id || 40; // Use a default if not found
      
      saleInvoiceObj = {
        customerId: customer.id,
        invoiceDate: saleInvoiceDTO.invoiceDate,
        dueDate: saleInvoiceDTO.dueDate,
        currencyCode: customer.currencyCode,
        exchangeRate: saleInvoiceDTO.exchangeRate || 1,
        referenceNo: saleInvoiceDTO.referenceNo,
        invoiceNo: saleInvoiceDTO.invoiceNo,
        invoiceMessage: saleInvoiceDTO.invoiceMessage,
        termsConditions: saleInvoiceDTO.termsConditions,
        projectId: saleInvoiceDTO.projectId,
        entries: [],
        userId: authorizedUser.id,
        balance: 0, // Will be calculated when we add task entries
        paymentAmount: 0
      };
    }
    
    // Now add transformed task and expense entries manually if there are any
    if (taskEntries.length > 0 || expenseEntries.length > 0) {
      // Get the income/sales account ID for tasks if needed
      const { Account } = this.tenancy.models(tenantId);
      const incomeAccount = await Account.query()
        .where('name', 'like', '%Service Income%')
        .orWhere('name', 'like', '%Sales%')
        .first();
        
      const incomeAccountId = incomeAccount?.id || 40; // Use a default if not found
      
      // Create manually transformed task entries
      const transformedTaskEntries = taskEntries.map(entry => {
        const total = entry.quantity * entry.rate;
        return {
          referenceId: null,
          referenceType: 'SaleInvoice',
          projectRefId: entry.projectRefId,
          projectRefType: entry.projectRefType,
          index: entry.index || 0,
          description: entry.description,
          quantity: entry.quantity,
          rate: entry.rate,
          discount: entry.discount || 0,
          discountType: entry.discountType || 'percentage',
          taxRateId: null,
          taxAmount: 0,
          sellAccountId: incomeAccountId,
          total: total
        };
      });

      // Create manually transformed expense entries
      const transformedExpenseEntries = expenseEntries.map(entry => {
        const total = entry.quantity * entry.rate;
        return {
          referenceId: null,
          referenceType: 'SaleInvoice',
          projectRefType: ProjectLinkRefType.Expense,
          index: entry.index || 0,
          description: entry.description,
          quantity: entry.quantity,
          rate: entry.rate,
          discount: entry.discount || 0,
          discountType: entry.discountType || 'percentage',
          taxRateId: null,
          taxAmount: 0,
          sellAccountId: incomeAccountId,
          total: total
        };
      });
      
      // Append task and expense entries to the invoice
      saleInvoiceObj.entries = [
        ...saleInvoiceObj.entries,
        ...transformedTaskEntries,
        ...transformedExpenseEntries
      ];
      
      // Update total balance
      const taskTotal = transformedTaskEntries.reduce((sum, entry) => sum + entry.total, 0);
      const expenseTotal = transformedExpenseEntries.reduce((sum, entry) => sum + entry.total, 0);
      saleInvoiceObj.balance = (saleInvoiceObj.balance || 0) + taskTotal + expenseTotal;
    }
    
    return saleInvoiceObj;
  };
}
