import { NextFunction, Request, RequestHandler, Response } from 'express';
import { exceptionMiddleware } from '@/middlewares/exception.middleware';
import { Exception } from '@/lib/exception';

export const validateFileMiddleware = (uploadMiddleware: RequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		uploadMiddleware(req, res, (err) => {
			// TODO
			// add unexcepted file error handling
			if (!err) {
				return next();
			}
			if (err instanceof Exception) {
				return exceptionMiddleware(err, req, res);
			}
			return exceptionMiddleware(Exception.InternalServerError(), req, res);
		});
	};
};
