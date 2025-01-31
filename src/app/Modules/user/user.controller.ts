import status from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import manageResponse from '../../Utils/manageResponse';
import { userSevices } from './user.service';

const updateUserProfile = catchAsync(async (req, res) => {
    const result = await userSevices.updateUserProfile_Into_DB(
        req.body,
        req?.file?.path!
    );
    manageResponse(res, status.OK, 'User profile updated successfully', result);
});

const updatePassword = catchAsync(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const result = await userSevices.updatePassword_Into_DB(
        req?.user?.userId,
        oldPassword,
        newPassword
    );
    manageResponse(res, status.OK, 'Password updated successfully', result);
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await userSevices.getAllUsersFrom_DB();
    result.forEach(user => (user.password = ''));
    manageResponse(res, status.OK, 'Users retrieved successfully', result);
});
const deActivateUser = catchAsync(async (req, res) => {
    const result = await userSevices.deActivateUser_From_DB(req?.body);
    manageResponse(res, status.OK, 'User deactivated successfully', result);
});
export const userController = {
    updateUserProfile,
    updatePassword,
    getAllUsers,
    deActivateUser
};
