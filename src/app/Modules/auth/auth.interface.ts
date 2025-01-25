export type TCreateUser = {
    name: string;
    email: string;
    password: string;
    role:"user"
};
export type TLoginUser = {
    email: string;
    password: string;
    isDeleted?:boolean;
};