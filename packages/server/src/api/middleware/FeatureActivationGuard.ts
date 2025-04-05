import { Request, Response } from 'express';
import { Features } from '@/interfaces';

export const FeatureActivationGuard =
  (feature: Features) => (req: Request, res: Response, next: Function) => {
    console.log(req.settings)
    const { settings } = req;

    const isActivated = settings.get({ group: 'features', key: feature });

    if (!isActivated) {
      return res.status(400).send({
        errors: [
          { type: 'FEATURE_NOT_ACTIVATED', code: 20, payload: { feature } },
        ],
      });
    }
    next();
  };
