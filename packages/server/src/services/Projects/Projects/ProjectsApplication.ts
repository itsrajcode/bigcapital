import { Inject, Service } from 'typedi';
import {
  IProjectCreateDTO,
  IProjectCreatePOJO,
  IProjectEditPOJO,
  IProjectGetPOJO,
  IProjectStatus,
  IVendorsFilter,
  ProjectBillableEntriesQuery,
  ProjectBillableEntry,
  ProjectBillableType,
  ISaleInvoiceCreateDTO,
  ITenantUser,
} from '@/interfaces';
import CreateProject from './CreateProject';
import DeleteProject from './DeleteProject';
import GetProject from './GetProject';
import EditProjectService from './EditProject';
import GetProjects from './GetProjects';
import EditProjectStatusService from './EditProjectStatus';
import GetProjectBillableEntries from './GetProjectBillableEntries';
import { SaleInvoiceApplication } from '@/services/Sales/Invoices/SaleInvoicesApplication';
import HasTenancyService from '@/services/Tenancy/TenancyService';

@Service()
export class ProjectsApplication {
  @Inject()
  private createProjectService: CreateProject;

  @Inject()
  private editProjectService: EditProjectService;

  @Inject()
  private deleteProjectService: DeleteProject;

  @Inject()
  private getProjectService: GetProject;

  @Inject()
  private getProjectsService: GetProjects;

  @Inject()
  private editProjectStatusService: EditProjectStatusService;

  @Inject()
  private getProjectBillable: GetProjectBillableEntries;

  @Inject()
  private saleInvoiceApplication: SaleInvoiceApplication;

  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Creates a new project.
   * @param {number} tenantId - Tenant id.
   * @param {IProjectCreateDTO} projectDTO - Create project DTO.
   * @return {Promise<IProjectCreatePOJO>}
   */
  public createProject = (
    tenantId: number,
    projectDTO: IProjectCreateDTO
  ): Promise<IProjectCreatePOJO> => {
    return this.createProjectService.createProject(tenantId, projectDTO);
  };

  /**
   * Edits details of the given vendor.
   * @param {number} tenantId - Tenant id.
   * @param {number} vendorId - Vendor id.
   * @param {IProjectCreateDTO} projectDTO - Create project DTO.
   * @returns {Promise<IVendor>}
   */
  public editProject = (
    tenantId: number,
    projectId: number,
    projectDTO: IProjectCreateDTO
  ): Promise<IProjectEditPOJO> => {
    return this.editProjectService.editProject(tenantId, projectId, projectDTO);
  };

  /**
   * Deletes the given project.
   * @param {number} tenantId
   * @param {number} vendorId
   * @return {Promise<void>}
   */
  public deleteProject = (
    tenantId: number,
    projectId: number
  ): Promise<void> => {
    return this.deleteProjectService.deleteProject(tenantId, projectId);
  };

  /**
   * Retrieves the vendor details.
   * @param {number} tenantId
   * @param {number} projectId
   * @returns {Promise<IProjectGetPOJO>}
   */
  public getProject = (
    tenantId: number,
    projectId: number
  ): Promise<IProjectGetPOJO> => {
    return this.getProjectService.getProject(tenantId, projectId);
  };

  /**
   * Retrieves the vendors paginated list.
   * @param {number} tenantId
   * @param {IVendorsFilter} filterDTO
   * @returns {Promise<IProjectGetPOJO[]>}
   */
  public getProjects = (
    tenantId: number,
    filterDTO: IVendorsFilter
  ): Promise<IProjectGetPOJO[]> => {
    return this.getProjectsService.getProjects(tenantId);
  };

  /**
   * Edits the given project status.
   * @param {number} tenantId
   * @param {number} projectId
   * @param {IProjectStatus} status
   * @returns {Promise<IProject>}
   */
  public editProjectStatus = (
    tenantId: number,
    projectId: number,
    status: IProjectStatus
  ) => {
    return this.editProjectStatusService.editProjectStatus(
      tenantId,
      projectId,
      status
    );
  };

  /**
   * Retrieves the billable entries of the given project.
   * @param {number} tenantId
   * @param {number} projectId
   * @param {ProjectBillableEntriesQuery} query
   * @returns {Promise<ProjectBillableEntry[]>}
   */
  public getProjectBillableEntries = (
    tenantId: number,
    projectId: number,
    query?: ProjectBillableEntriesQuery
  ): Promise<ProjectBillableEntry[]> => {
    return this.getProjectBillable.getProjectBillableEntries(
      tenantId,
      projectId,
      query
    );
  };

  /**
   * Creates a new invoice for the given project.
   * @param {number} tenantId
   * @param {number} projectId
   * @param {ProjectBillableEntry[]} billableEntries
   * @param {ITenantUser} authorizedUser
   * @returns {Promise<ISaleInvoice>}
   */
  public async createProjectInvoice(
    tenantId: number,
    projectId: number,
    dueDate: Date,
    billableEntries: ProjectBillableEntry[],
    authorizedUser: ITenantUser
  ) {
    const { Project } = this.tenancy.models(tenantId);

    // Get the raw project model first
    const project = await Project.query()
      .findById(projectId)
      .throwIfNotFound();
    console.log(project)
    console.log(billableEntries)
    // Create sale invoice DTO with all required properties
    const saleInvoiceDTO: ISaleInvoiceCreateDTO = {
      customerId: project.contactId,
      invoiceDate: new Date(),
      dueDate: dueDate,
      projectId: projectId,
      entries: billableEntries.map((entry, index) => ({
        itemId: entry.billableId, // You'll need to map this to an actual item ID
        index,
        description: `${entry.billableType} - ${entry.billableTransactionNo}`,
        quantity: entry.billableHours,
        rate: entry.billableAmount
      })),
      fromEstimateId: 0, // Since this is not from an estimate
      referenceNo: '', // Empty string for now
      invoiceNo: '', // Will be generated by the system
      invoiceMessage: '',
      termsConditions: '',
      delivered: false,
      isTaxExclusive: true
    };
    console.log(saleInvoiceDTO)
    // Create the sale invoice
    const saleInvoice = await this.saleInvoiceApplication.createSaleInvoice(
      tenantId,
      saleInvoiceDTO,
      authorizedUser
    );
    console.log(saleInvoice)
    return saleInvoice;
  }

  /**
   * Retrieves all invoices associated with projects.
   * @param {number} tenantId - The tenant ID
   * @returns {Promise<ISaleInvoice[]>}
   */
  public async getAllProjectInvoices(tenantId: number) {
    const { SaleInvoice } = this.tenancy.models(tenantId);

    const invoices = await SaleInvoice.query()
      .whereNotNull('project_id')
      .withGraphFetched('[entries, customer]')
      .select([
        'id',
        'balance',
        'payment_amount',
        'invoice_date as invoiceDate',
        'due_date as dueDate',
        'invoice_no as invoiceNo',
        'reference_no as referenceNo',
        'project_id as projectId',
        'delivered_at as deliveredAt',
        'payment_amount as paymentAmount',
        'customer_id as customerId'
      ])
      .orderBy('created_at', 'desc')
      .modify((builder) => {
        // Add a computed column for status
        builder.select(
          SaleInvoice.knex().raw(`
            CASE
              WHEN delivered_at IS NULL THEN 'draft'
              WHEN payment_amount = 0 AND CURRENT_DATE > due_date THEN 'overdue'
              WHEN payment_amount = 0 THEN 'unpaid'
              WHEN payment_amount < balance THEN 'partially-paid'
              WHEN payment_amount >= balance THEN 'paid'
              ELSE 'delivered'
            END as status
          `)
        );
      });

    return invoices;
  }
}
