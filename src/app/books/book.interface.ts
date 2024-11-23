export type TBook = {
    title: string;
    author: string;
    price: number;
    category:
        | 'Fiction'
        | 'Science'
        | 'SelfDevelopment'
        | 'Poetry'
        | 'Religious';
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt?: string;
    updatedAt?: string;
    isDeleted: boolean;
};
