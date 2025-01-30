import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../Utils/catchAsync';
import { UserModel } from '../Modules/user/user.model';
import { TRole } from '../types/global.type';
import config from '../config';


const auth = (...requiredRoles: TRole[]) => {
      return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            // checking if the token is missing
            if (!token) {
                  throw new Error("You are not Authorize");
            }

            let decoded;
            try {
                  decoded = jwt.verify(
                        token,
                        config.jwt_access_secret as string
                  ) as JwtPayload;
            } catch (err) {
                  console.log(err)
                  throw new Error('Invalid token!');
            }
            const { role, userId } = decoded;

            // checking if the user is exist
            const user = await UserModel.isUserExist(userId);

            if (!user) {
                  throw new Error('This user is not found !');
            }
            // checking if the user is already deleted

            const isDeleted = user?.isDeleted;

            if (isDeleted) {
                  throw new Error('This user is deleted !');
            }


            if (requiredRoles && !requiredRoles.includes(role)) {
                  throw new Error('You are not authorized!');
            }
            req.user = decoded as JwtPayload & { role: string };
            next();
      });
};

export default auth;
