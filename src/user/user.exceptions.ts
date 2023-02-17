import { Exception } from '@/lib/exception';

export class UserExceptions extends Exception {
	static UserAlreadyExist() {
		return super.NewException('User with this email already exist.', 400);
	}

	static WrongAuthData() {
		return super.NewException('Wrong email or password.', 400);
	}
}
