import { status } from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import manageResponse from '../../Utils/manageResponse';
import { authServices } from './auth.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
    const result = await authServices.createUserIntoDB(req?.body);
    manageResponse(res, status.CREATED, 'User Created Successfully', result);
});



const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUserFromDB(req.body);
    const { refreshToken, accessToken ,user} = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.env_type === 'production',
        httpOnly: true,
        sameSite: config.env_type === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 365
    });
    manageResponse(res, status.OK, 'User Login Successfully', { accessToken , user});
});



const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken);

    manageResponse(res, status.OK, 'Token Refreshed Successfully', result);
});
export const authController = {
    createUser,
    loginUser,
    refreshToken
};
