import { Service, Inject } from 'typedi';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import { IExpenseCreateDTO } from '@/interfaces';
import { CommandExpenseValidator } from '@/services/Expenses/CRUD/CommandExpenseValidator';

@Service()
export class ProjectExpensesApplication {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private expenseValidator: CommandExpenseValidator;

  /**
   * Creates a new project expense.
   * @param {number} tenantId - The tenant id
   * @param {number} projectId - The project id
   * @param {IExpenseCreateDTO} expenseDTO - The expense DTO
   */
  public async createProjectExpense(
    tenantId: number,
    projectId: number,
    expenseDTO: any
  ) {
    const { Expense } = this.tenancy.models(tenantId);

    // Transform the project expense DTO to expense DTO
    const transformedDTO = this.transformToExpenseDTO(projectId, expenseDTO);

    // Create the expense entry
    const expense = await Expense.query().insert({
      ...transformedDTO,
      projectId,
    });

    return expense;
  }

  /**
   * Transforms project expense DTO to expense DTO.
   * @param {number} projectId 
   * @param {any} projectExpenseDTO 
   * @returns {IExpenseCreateDTO}
   */
  private transformToExpenseDTO(projectId: number, projectExpenseDTO: any) {
    const {
      expenseName,
      expenseDate,
      expenseQuantity,
      expenseUnitPrice,
      expenseTotal,
      expenseCharge,
    } = projectExpenseDTO;

    return {
      description: expenseName,
      payment_date: expenseDate,
      total_amount: expenseTotal,
      categories: [
        {
          amount: expenseTotal,
          description: expenseName,
          project_id: projectId,
          quantity: expenseQuantity,
          rate: expenseUnitPrice,
        },
      ],
    };
  }

  /**
   * Retrieves all expenses for a specific project with pagination.
   * @param {number} tenantId - The tenant id
   * @param {number} projectId - The project id
   * @param {number} page - Page number
   * @param {number} pageSize - Number of items per page
   * @returns {Promise<{ data: any[], pagination: any }>}
   */
  public async getProjectExpenses(
    tenantId: number,
    projectId: number,
    page: number = 1,
    pageSize: number = 20
  ) {
    const { Expense } = this.tenancy.models(tenantId);

    const results = await Expense.query()
      .where('project_id', projectId)
      .orderBy('payment_date', 'DESC')
      .page(page - 1, pageSize);

    return {
      data: results.results,
      pagination: {
        page,
        pageSize,
        total: results.total,
        pageCount: Math.ceil(results.total / pageSize)
      }
    };
  }
}