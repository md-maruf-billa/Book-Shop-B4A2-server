import config from '../../config';
import { TUserUpdate } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

const updateUserProfile_Into_DB = async (
    payload: TUserUpdate,
    profileImage: string
) => {
    // Check if user exists first
    const existingUser = await UserModel.findOne({ email: payload.email });

    if (!existingUser) {
        throw new Error('User not found!');
    }

    // Update user
    const result = await UserModel.findByIdAndUpdate(
        existingUser._id,
        {
            $set: {
                ...(payload.name && { name: payload.name }),
                ...(payload.address && { address: payload.address }),
                ...(payload.phone && { phone: payload.phone }),
                ...(profileImage && { profileImage })
            }
        },
        { new: true }
    ).lean();
    return result;
};
const updatePassword_Into_DB = async (
    userId: string,
    oldPassword: string,
    newPassword: string
) => {
    const isExist = await UserModel.isUserExist(userId);
    if (!isExist) {
        throw new Error('User not found!');
    }
    if (!bcrypt.compareSync(oldPassword, isExist.password)) {
        throw new Error('Old password is incorrect!');
    }
    const hashedPassword = bcrypt.hashSync(
        newPassword,
        Number(config.bycript_solt!)
    );
    const result = await UserModel.findByIdAndUpdate(
        isExist._id,
        { $set: { password: hashedPassword } },
        { new: true }
    ).lean();

    return result;
};
const getAllUsersFrom_DB = async () => {
    const result = await UserModel.find({
        role: 'user'
    }).lean();
    return result;
};
const deActivateUser_From_DB = async (payload: {
    email: string;
    accountStatus: 'blocked' | 'active';
}) => {
    const result =await UserModel.findOneAndUpdate(
        { email: payload?.email },
        { $set: { accountStatus: payload?.accountStatus } },
        { new: true }
    ).lean();
    return result;
};
export const userSevices = {
    updateUserProfile_Into_DB,
    updatePassword_Into_DB,
    getAllUsersFrom_DB,
    deActivateUser_From_DB
};
