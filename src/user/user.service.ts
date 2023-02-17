import { RegisterDto } from './dtos/register.dto';
import { User, UserModel } from '@/profile/models/user.model';
import { ProfileDto } from '@/profile/dtos/profile.dto';
import { UserExceptions } from './user.exceptions';
import jwt from 'jsonwebtoken';
import { UserToken } from '@/profile/models/user-token.model';
import argon2 from 'argon2';
import { LoginDto } from '@/user/dtos/login.dto';

export class UserService {
	private static createResponseDto(
		user: UserModel,
		accessToken: string,
		refreshToken: string
	) {
		const response = {
			accessToken,
			user: new ProfileDto(user),
		};
		return { response, refreshToken };
	}

	static async refreshTokens(refreshToken: string) {
		const userToken = await UserToken.findOne({ where: { refreshToken } });
		if (!userToken) {
			throw UserExceptions.ForbiddenException();
		}
		return this.generateTokens(userToken.getDataValue('userId'));
	}

	static async generateTokens(userId: string, save = true) {
		const accessToken = jwt.sign(
			{ id: userId },
			process.env.JWT_ACCESS_SECRET!,
			{
				expiresIn: '1d',
			}
		);
		const refreshToken = jwt.sign(
			{ id: userId },
			process.env.JWT_REFRESH_SECRET!,
			{ expiresIn: '7d' }
		);
		if (!save) {
			return { refreshToken, accessToken };
		}
		const candidate = await UserToken.findOne({ where: { userId } });
		if (!candidate) {
			await UserToken.create({ userId, refreshToken });
		} else {
			candidate.setDataValue('refreshToken', refreshToken);
			await candidate.save();
		}
		return { refreshToken, accessToken };
	}

	static async deleteToken(refreshToken: string) {
		const userToken = await UserToken.findOne({ where: { refreshToken } });
		if (!userToken) {
			throw UserExceptions.ForbiddenException();
		}
		await userToken.destroy();
	}

	static async register({ email, firstName, password }: RegisterDto) {
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			throw UserExceptions.UserAlreadyExist();
		}
		const hashedPassword = await argon2.hash(password);
		const user = await User.create({
			password: hashedPassword,
			firstName,
			email,
		});
		const { accessToken, refreshToken } = await this.generateTokens(
			user.getDataValue('id')
		);
		return this.createResponseDto(user, accessToken, refreshToken);
	}

	static async login({ email, password }: LoginDto) {
		const candidate = await User.findOne({ where: { email } });
		if (
			!candidate ||
			!(await argon2.verify(candidate.getDataValue('password'), password))
		) {
			throw UserExceptions.WrongAuthData();
		}
		const { accessToken, refreshToken } = await this.generateTokens(
			candidate.getDataValue('id')
		);
		return this.createResponseDto(candidate, accessToken, refreshToken);
	}

	static verifyAccessToken(accessToken: string): string {
		const { id } = jwt.verify(
			accessToken,
			process.env.JWT_ACCESS_SECRET!
		) as Record<string, any>;
		if (!id) {
			throw UserExceptions.UnauthorizedException();
		}
		return id;
	}
}
