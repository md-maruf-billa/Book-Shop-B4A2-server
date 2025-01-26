import config from '../../config';
import { UserModel } from '../user/user.model';
import { TCreateUser, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import ms from 'ms';

const createUserIntoDB = async (payload: TCreateUser) => {
    const hasPassword = bcrypt.hashSync(
        payload?.password,
        Number(config.bycript_solt)
    );
    const result = await UserModel.create({
        ...payload,
        password: hasPassword
    });
    return result;
};

const loginUserFromDB = async (payload: TLoginUser) => {
    const isUserExist = await UserModel.isUserExist(payload.email);
    if (!isUserExist) {
        throw new Error('User not found');
    }
    if (isUserExist.isDeleted) {
        throw new Error('User is deleted');
    }
    const isPasswordMatch = bcrypt.compareSync(
        payload.password,
        isUserExist.password
    );
    if (!isPasswordMatch) {
        throw new Error('Incrrect Password');
    }
    const jwtPayload = {
        userId: isUserExist.email,
        role: isUserExist.role
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as ms.StringValue
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as ms.StringValue
    );

    return {
        accessToken,
        user:jwtPayload,
        refreshToken
    };
};
const refreshToken = async (token: string) => {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const { email,role, iat } = decoded;

    // checking if the user is exist
    const user = await UserModel.isUserExist(email);

    if (!user) {
        throw new Error( 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new Error( 'This user is deleted !');
    }


    const jwtPayload = {
        userId: user.email,
        role: user.role
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as ms.StringValue
    );

    return {
        accessToken
    };
};

export const authServices = {
    createUserIntoDB,
    loginUserFromDB,
    refreshToken
};
