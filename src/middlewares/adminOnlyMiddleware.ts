import { NextFunction, Request, Response } from 'express';
import { isAdmin } from '../utils/permissionsUtils';

const adminOnlyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    return res.status(401).send({ error: 'You have no access to this functionality' });
  }

  const currentUserAdmin = await isAdmin(req.currentUser);
  if (currentUserAdmin) {
    return next();
  }

  return res.status(401).send({ error: 'You have no access to this functionality' });
};

export default adminOnlyMiddleware;
