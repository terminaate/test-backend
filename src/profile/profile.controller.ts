import { Controller } from '@/lib/controller';
import { ProfileService } from './profile.service';
import { TypedRequest } from '@/types/TypedRequest';
import { ProfileDto } from './dtos/profile.dto';
import { upload } from '@/middlewares/upload.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { PatchProfileDto } from '@/profile/dtos/patch-profile.dto';
import { FileRequest } from '@/types/FileRequest';
import { validateFileMiddleware } from '@/middlewares/validate-file.middleware';

export class ProfileController extends Controller {
	@ProfileController.Get('/:userId')
	async getUser(
		req: TypedRequest<Record<string, unknown>, { userId: string }>
	) {
		const user = await ProfileService.getUserById(req.params.userId);
		return new ProfileDto(user);
	}

	@ProfileController.Get('/')
	async getAllUsers(
		req: TypedRequest<
			Record<string, unknown>,
			{ userId: string },
			{ page: string }
		>
	) {
		const { page } = req.query;
		return ProfileService.getAllUsers(isNaN(+page) ? 0 : +page);
	}

	@ProfileController.Put(
		'/:userId',
		validateFileMiddleware(upload.array('photo', 1)),
		validationMiddleware(PatchProfileDto)
	)
	async patchUser(req: FileRequest<PatchProfileDto, { userId: string }>) {
		return ProfileService.patchUser(req.params.userId, {
			...req.body,
			photo: req.files![0].filename
		});
	}
}
