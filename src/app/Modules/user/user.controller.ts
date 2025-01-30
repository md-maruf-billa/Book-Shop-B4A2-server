import status from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import manageResponse from '../../Utils/manageResponse';
import { userSevices } from './user.service';

const updateUserProfile = catchAsync(async (req, res) => {

    const result = await userSevices.updateUserProfile_Into_DB(req.body,req?.file?.path!);
    manageResponse(res, status.OK, 'User profile updated successfully', result);
});

export const userController = {
    updateUserProfile
};
