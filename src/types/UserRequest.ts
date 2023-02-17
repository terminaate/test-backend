import { TypedRequest } from './TypedRequest';
import { UserModel } from '@/profile/models/user.model';

export type UserRequest<
	B = Record<string, unknown>,
	P = Record<string, unknown>
> = TypedRequest<B, P> & { user: UserModel };
