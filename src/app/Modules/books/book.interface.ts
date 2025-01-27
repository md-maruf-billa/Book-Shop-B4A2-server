export type TBook = {
    title: string;
    author: string;
    price: number;
    bookImage?: string;
    category:
        | 'Fiction'
        | 'NonFiction'
        | 'Science'
        | 'SelfDevelopment'
        | 'Poetry'
        | 'Religious'
        | 'Biography'
        | 'Fantasy'
        | 'History'
        | 'Thriller'
        | 'Mystery';
    description: string;
    quantity: number;
    exchangeable: 'Exchangeable' | 'Non Exchangeable';
    publishYear: number;
    inStock: boolean;
    createdAt?: string;
    updatedAt?: string;
    isDeleted: boolean;
};
