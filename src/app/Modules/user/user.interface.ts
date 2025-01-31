import { Model } from 'mongoose';

export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    profileImage?: string;
    address?: string;
    phone?: string;
    role: 'user';
    isDeleted?: boolean;
    accountStatus?:'blocked'|'active';
};
export type TUserUpdate = {
    email: string;
    name?: string;
    address?: string;
    phone?: string;
};
export interface UserInterfaceModel extends Model<TUser> {
    isUserExist(email: string): Promise<TUser>;
}
