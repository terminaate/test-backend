import { Router } from 'express';
import { UserController } from '@/user/user.controller';
import { ProfileController } from '@/profile/profile.controller';

export const apiRouter = Router();

apiRouter.use('/user', UserController.router);
apiRouter.use('/profile', ProfileController.router);
