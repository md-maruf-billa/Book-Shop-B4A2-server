import { TUserUpdate } from './user.interface';
import { UserModel } from './user.model';

const updateUserProfile_Into_DB = async (
    payload: TUserUpdate,
    profileImage: string
) => {
    // Check if user exists first
    console.log(payload.email)
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

export const userSevices = {
    updateUserProfile_Into_DB
};
