import { Request, Response, NextFunction } from 'express';
const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
