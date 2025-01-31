import { model, Schema } from 'mongoose';
import { TUser, UserInterfaceModel } from './user.interface';

const userSchema = new Schema<TUser, UserInterfaceModel>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['user']
        },
        profileImage: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        accountStatus: {
            type: String,
            enum: ['blocked', 'active'],
            default: 'active'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.statics.isUserExist = async function (
    email: string
): Promise<TUser | null> {
    return this.findOne({ email });
};

export const UserModel = model<TUser, UserInterfaceModel>('User', userSchema);
