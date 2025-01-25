import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../Middleware/valideteRequest';
import { userValidation } from './auth.validation';
const authRouter = Router();

authRouter.post(
    '/create-user',
    validateRequest(userValidation.createUserSchema),
    authController.createUser
);

authRouter.post('/login', validateRequest(userValidation.loginUserSchema),authController.loginUser);

export default authRouter;
