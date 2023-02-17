import { NextFunction, Request, Response } from 'express';
import { UserService } from '@/user/user.service';
import { exceptionMiddleware } from './exception.middleware';
import { Exception } from '@/lib/exception';
import { ProfileService } from '@/profile/profile.service';
import { UserRequest } from '@/types/UserRequest';

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.headers.authorization?.split(' ')[1];
	if (!accessToken) {
		return exceptionMiddleware(Exception.UnauthorizedException(), req, res);
	}
	try {
		const userId = UserService.verifyAccessToken(accessToken);
		const candidate = await ProfileService.getUserById(userId);
		(req as UserRequest).user = candidate;
		next();
	} catch (e) {
		return exceptionMiddleware(Exception.UnauthorizedException(), req, res);
	}
};
