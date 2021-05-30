import { Request, Response, NextFunction } from 'express'


type Fn = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const Catch = (fn: Fn) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);

