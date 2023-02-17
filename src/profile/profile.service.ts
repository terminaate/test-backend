import { ProfileExceptions } from './profile.exceptions';
import { User, UserSchema } from './models/user.model';
import { isUUID } from 'class-validator';
import { ProfileDto } from '@/profile/dtos/profile.dto';
import { PatchProfileDto } from '@/profile/dtos/patch-profile.dto';

const pageLimit = 10;

export class ProfileService {
	static async getUserById(userId: string) {
		if (!userId || !isUUID(userId)) {
			throw ProfileExceptions.UserIdIsNotExist();
		}
		const user = await User.findByPk(userId);
		if (!user) {
			throw ProfileExceptions.UserIdIsNotExist();
		}
		return user;
	}

	static async getAllUsers(page: number) {
		let users;
		if (page > 0) {
			users = await User.findAll({
				limit: pageLimit,
				offset: (page - 1) * pageLimit,
			});
		} else {
			users = await User.findAll({ limit: pageLimit * 10 });
		}
		return users.map((o) => new ProfileDto(o));
	}

	static async patchUser(userId: string, patchProfileDto: PatchProfileDto) {
		const user = await this.getUserById(userId);
		const whiteList = ['firstName', 'lastName', 'email', 'gender', 'photo'];
		for (const key in patchProfileDto) {
			if (whiteList.includes(key)) {
				user.setDataValue(key as keyof UserSchema, patchProfileDto[key]);
			}
		}
		await user.save();
		return new ProfileDto(user);
	}
}
