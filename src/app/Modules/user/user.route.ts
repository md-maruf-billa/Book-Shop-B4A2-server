import { NextFunction, Request, Response, Router } from 'express';
import upload from '../../Utils/multer.config';
import validateRequest from '../../Middleware/valideteRequest';
import { userValidationSchamas } from './user.validation';
import { userController } from './user.controller';
import auth from '../../Middleware/auth';

const userRouter = Router();

userRouter.patch(
    '/update-profile',
    upload.single('image'), // Upload the image to Cloudinary
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(userValidationSchamas.userUpdateZonValidationSchema),
    userController.updateUserProfile
);
userRouter.patch("/deactivate-user",auth("admin"), userController.deActivateUser);

userRouter.put("/update-password",auth("user"),userController.updatePassword)
userRouter.get("/get-all-user", auth("admin"), userController.getAllUsers)

export default userRouter;
