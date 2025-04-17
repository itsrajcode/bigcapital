import { Inject, Service } from 'typedi';
import { Router, Request, Response, NextFunction } from 'express';
import DashboardService from '@/services/Dashboard/DashboardService';

@Service()
export default class DashboardMetaController {
  @Inject()
  private dashboardService: DashboardService;

  /**
   * Constructor router.
   * @returns
   */
  public router() {
    const router = Router();

    router.get('/boot', this.getDashboardBoot);
    router.get('/meta', this.getDashboardAnalytics);

    return router;
  }

  /**
   * Retrieve the dashboard boot meta.
   * @param {Request} req -
   * @param {Response} res - 
   * @param {NextFunction} next -
   */
  private getDashboardBoot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorizedUser = req.user;
    const { tenantId } = req;

    try {
      const meta = await this.dashboardService.getBootMeta(
        tenantId,
        authorizedUser
      );

      return res.status(200).send({ meta });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieve the dashboard analytics.
   * @param {Request} req -
   * @param {Response} res - 
   * @param {NextFunction} next -
   */
  private getDashboardAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorizedUser = req.user;
    const { tenantId } = req;

    try {
      const analytics_dashboard_data = await this.dashboardService.getAnalytics(
        tenantId,
        authorizedUser
      );

      return res.status(200).send({ analytics_dashboard_data });
    } catch (error) {
      next(error);
    }
  };
}