import { Controller } from '@/lib/controller';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { TypedRequest } from '@/types/TypedRequest';
import { Request, Response } from 'express';
import { ResponseDto } from '@/dtos/response.dto';

const refreshMaxAge = 1000 * 60 * 60 * 24 * 7;

export class UserController extends Controller {
	@UserController.Post('/register', validationMiddleware(RegisterDto))
	async register(req: TypedRequest<RegisterDto>, res: Response) {
		const { response, refreshToken } = await UserService.register(req.body);
		res.status(201);
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: refreshMaxAge,
			signed: true,
		});
		return response;
	}

	@UserController.Post('/login', validationMiddleware(RegisterDto))
	async login(req: TypedRequest<RegisterDto>, res: Response) {
		const { response, refreshToken } = await UserService.login(req.body);
		res.status(201);
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: refreshMaxAge,
			signed: true,
		});
		return response;
	}

	@UserController.Post('/logout')
	async logout(req: Request, res: Response) {
		const { refreshToken } = req.signedCookies;
		await UserService.deleteToken(refreshToken);
		res.clearCookie('refreshToken');
		res.status(200);
		return new ResponseDto('Success', 200);
	}

	@UserController.Post('/refresh')
	async refresh(req: Request, res: Response) {
		const { refreshToken: oldRefreshToken } = req.signedCookies;
		const { accessToken, refreshToken } = await UserService.refreshTokens(
			oldRefreshToken
		);
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: refreshMaxAge,
			signed: true,
		});
		return { accessToken };
	}
}
