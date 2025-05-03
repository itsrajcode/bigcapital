import { Inject, Service } from 'typedi';
import { IFeatureAllItem, ISystemUser } from '@/interfaces';
import { FeaturesManager } from '@/services/Features/FeaturesManager';
import HasTenancyService from '@/services/Tenancy/TenancyService';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@/config');
import moment from 'moment';
import { Knex } from 'knex';

interface IRoleAbility {
  subject: string;
  ability: string;
}

interface IDashboardBootMeta {
  abilities: IRoleAbility[];
  features: IFeatureAllItem[];
  isBigcapitalCloud: boolean;
}

interface IInvoiceStatus {
  status: string;
  count: number;
}

interface ITopSellingItem {
  id: number;
  name: string;
  quantity: number;
}

interface ITopUnpaidInvoice {
  id: number;
  invoiceNo: string;
  dueAmount: number;
  dueDate: Date;
  customerName: string;
}

interface ITopPayable {
  id: number;
  billNumber: string;
  dueAmount: number;
  dueDate: Date;
  vendorName: string;
}

interface ICashAndBankBalance {
  accountId: number;
  accountName: string;
  balance: number;
}

interface IIncomeExpenseOverview {
  month: string;
  income: number;
  expense: number;
}

@Service()
export default class DashboardService {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private featuresManager: FeaturesManager;

  /**
   * Retrieve dashboard meta.
   * @param {number} tenantId
   * @param {number} authorizedUser
   */
  public getBootMeta = async (
    tenantId: number,
    authorizedUser: ISystemUser
  ): Promise<IDashboardBootMeta> => {
    // Retrieves all orgnaization abilities.
    const abilities = await this.getBootAbilities(tenantId, authorizedUser.id);

    // Retrieves all organization features.
    const features = await this.featuresManager.all(tenantId);

    return {
      abilities,
      features,
      isBigcapitalCloud: config.hostedOnBigcapitalCloud
    };
  };

  /**
   * Retrieves dashboard analytics data.
   * @param {number} tenantId
   * @param {ISystemUser} authorizedUser
   */
  public getAnalytics = async (tenantId: number, authorizedUser: ISystemUser) => {
    const { User, SaleInvoice, ItemEntry, Bill, Account, Expense } = this.tenancy.models(tenantId);

    const tenantUser = await User.query()
      .findOne('systemUserId', authorizedUser.id)
      .withGraphFetched('role.permissions');

    // Get top 10 selling items in the last 6 months
    const topSellingItemsQuery = ItemEntry.query()
    .select(
      ItemEntry.knex().raw('`ITEMS_ENTRIES`.`ITEM_ID` AS `ID`'),
      ItemEntry.knex().raw('`ITEMS`.`NAME`'),
      ItemEntry.knex().raw('SUM(`ITEMS_ENTRIES`.`QUANTITY`) AS total_quantity')
    )
    .join(
      ItemEntry.knex().raw('`ITEMS` ON `ITEMS_ENTRIES`.`ITEM_ID` = `ITEMS`.`ID`')
    )
    .join(
      ItemEntry.knex().raw('`SALES_INVOICES` ON `ITEMS_ENTRIES`.`REFERENCE_ID` = `SALES_INVOICES`.`ID` AND `ITEMS_ENTRIES`.`REFERENCE_TYPE` = \'SaleInvoice\'')
    )
    .where(
      ItemEntry.knex().raw('`SALES_INVOICES`.`INVOICE_DATE` >= ?', [moment().subtract(6, 'months').toDate()])
    )
    .groupBy(
      ItemEntry.knex().raw('`ITEMS_ENTRIES`.`ITEM_ID`, `ITEMS`.`NAME`')
    )
    .orderBy(
      ItemEntry.knex().raw('SUM(`ITEMS_ENTRIES`.`QUANTITY`)'), 'DESC'
    )
    .limit(10);
  

     
    const topSellingItems = await topSellingItemsQuery.then(results => 
      results.map(item => ({
        id: item.id,
        name: item.name,
        quantity: Number(item.totalQuantity)
      }))
    );
   

    // Get income and expense overview for last 6 months
    const currentDate = moment();
    const sixMonthsAgo = moment().subtract(5, 'months').startOf('month');
    
    console.log('[DashboardService] Date Range:', {
      currentDate: currentDate.format('YYYY-MM-DD'),
      sixMonthsAgo: sixMonthsAgo.format('YYYY-MM-DD')
    });

    const incomeExpenseOverview = await Promise.all(
      Array.from({ length: 6 }, (_, i) => {
        const month = moment(sixMonthsAgo).add(i, 'months');
        const startDate = month.startOf('month').format('YYYY-MM-DD');
        const endDate = month.endOf('month').format('YYYY-MM-DD');

        console.log(`[DashboardService] Processing month ${i + 1}:`, {
          month: month.format('MMM YYYY'),
          startDate,
          endDate
        });

        return Promise.all([
          // Get income for the month - using payment_amount for actual received income
          SaleInvoice.query()
            .sum('payment_amount as totalIncome')
            .where('invoice_date', '>=', startDate)
            .where('invoice_date', '<=', endDate)
            .first()
            .then(result => {
              console.log(`[DashboardService] Month ${month.format('MMM')} Income Raw:`, result);
              const income = Number(result?.totalIncome || 0);
              console.log(`[DashboardService] Month ${month.format('MMM')} Income:`, {
                rawResult: result,
                totalIncome: result?.totalIncome,
                parsedIncome: income
              });
              return { total_income: income };
            }),
          // Get expenses for the month - scale up by 100 to make it more visible
          Expense.query()
            .select(
              Expense.knex().raw('COALESCE(SUM(total_amount), 0) * 100 as totalExpense')
            )
            .where('payment_date', '>=', startDate)
            .where('payment_date', '<=', endDate)
            .first()
            .then(result => {
              console.log(`[DashboardService] Month ${month.format('MMM')} Expense Raw:`, result);
              const expense = Number(result?.totalExpense || 0);
              console.log(`[DashboardService] Month ${month.format('MMM')} Expense:`, {
                rawResult: result,
                totalExpense: result?.totalExpense,
                parsedExpense: expense,
                actualExpense: expense / 100 // Log the actual expense amount
              });
              return { 
                total_expense: expense,
                actual_expense: expense / 100
              };
            })
        ]).then(([income, expense]) => {
          const monthData = {
            month: month.format('MMM'),
            income: income.total_income,
            expense: expense.total_expense,
            actualExpense: expense.actual_expense // Store actual expense for reference
          };
          console.log(`[DashboardService] Month ${month.format('MMM')} Summary:`, monthData);
          return {
            month: monthData.month,
            income: monthData.income,
            expense: monthData.expense // Return scaled expense for graph visibility
          };
        });
      })
    );
    
    
    // Use a direct raw query for more control
    const topUnpaidInvoices = await SaleInvoice.knex().raw(`
      SELECT 
        SALES_INVOICES.ID as id, 
        SALES_INVOICES.INVOICE_NO as invoiceNo, 
        SALES_INVOICES.DUE_DATE as dueDate,
        (SALES_INVOICES.BALANCE - SALES_INVOICES.PAYMENT_AMOUNT) as dueAmount,
        CONTACTS.DISPLAY_NAME as customerName
      FROM 
        SALES_INVOICES
      INNER JOIN 
        CONTACTS ON SALES_INVOICES.CUSTOMER_ID = CONTACTS.ID
      WHERE 
        SALES_INVOICES.PAYMENT_AMOUNT < SALES_INVOICES.BALANCE
      ORDER BY 
        dueAmount DESC
      LIMIT 5
    `).then(result => result[0]);
    
  
    // Get top 5 paid invoices
    const paidInvoices = await SaleInvoice.knex().raw(`
      SELECT 
        SALES_INVOICES.ID as id, 
        SALES_INVOICES.INVOICE_NO as invoiceNo, 
        SALES_INVOICES.DUE_DATE as dueDate,
        SALES_INVOICES.PAYMENT_AMOUNT as paidAmount,
        SALES_INVOICES.BALANCE as totalAmount,
        CONTACTS.DISPLAY_NAME as customerName
      FROM 
        SALES_INVOICES
      INNER JOIN 
        CONTACTS ON SALES_INVOICES.CUSTOMER_ID = CONTACTS.ID
      WHERE 
        SALES_INVOICES.PAYMENT_AMOUNT >= SALES_INVOICES.BALANCE
      ORDER BY 
        SALES_INVOICES.CREATED_AT DESC, SALES_INVOICES.ID DESC
      LIMIT 5
    `).then(result => result[0]);
    
   


    // Get cash and bank balances
    const cashAndBankBalances = await Account.knex().raw(`
      SELECT 
        ACCOUNTS.ID as accountId,
        ACCOUNTS.NAME as accountName,
        ACCOUNTS.BANK_BALANCE as balance
      FROM 
        ACCOUNTS
      WHERE
        ACCOUNTS.ACCOUNT_TYPE IN ('bank', 'cash')
      ORDER BY
        ACCOUNTS.BANK_BALANCE DESC
      `).then(result => result[0]);

 
    // Get invoice statuses count
    const invoiceStatuses = await SaleInvoice.knex().raw(`
      SELECT
        CASE
          WHEN DELIVERED_AT IS NULL THEN 'draft'
          WHEN PAYMENT_AMOUNT = 0 AND CURRENT_DATE > DUE_DATE THEN 'overdue'
          WHEN PAYMENT_AMOUNT = 0 THEN 'unpaid'
          WHEN PAYMENT_AMOUNT < BALANCE THEN 'partially-paid'
          WHEN PAYMENT_AMOUNT >= BALANCE THEN 'paid'
          ELSE 'delivered'
        END as status,
        COUNT(*) as count
      FROM SALES_INVOICES
      GROUP BY status
    `).then(result => result[0]);

   

    return {
      tenantUser,
      topSellingItems,
      incomeExpenseOverview,
      topUnpaidInvoices,
      cashAndBankBalances,
      invoiceStatuses
    };
  };

  /**
   * Transformes role permissions to abilities.
   */
  transformRoleAbility = (permissions) => {
    return permissions
      .filter((permission) => permission.value)
      .map((permission) => ({
        subject: permission.subject,
        action: permission.ability,
      }));
  };

  /**
   * Retrieve the boot abilities.
   * @returns
   */
  private getBootAbilities = async (
    tenantId: number,
    systemUserId: number
  ): Promise<IRoleAbility[]> => {
    const { User } = this.tenancy.models(tenantId);

    const tenantUser = await User.query()
      .findOne('systemUserId', systemUserId)
      .withGraphFetched('role.permissions');

    return tenantUser.role.slug === 'admin'
      ? [{ subject: 'all', action: 'manage' }]
      : this.transformRoleAbility(tenantUser.role.permissions);
  };
}


