import { Model } from "mongoose";

export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    profileImage?: string;
    address?: string;
    phone?: string;
    role: 'user';
    isDeleted?:boolean
};
export interface UserInterfaceModel extends Model<TUser> {
    isUserExist(email: string): Promise<TUser>;
    
  
  }
  