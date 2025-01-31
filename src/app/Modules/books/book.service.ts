// save product data in db

import { BookModel, ReviewModel } from './book.schema';
import { TBook, TBookReview } from './book.interface';
import QueryBuilder from '../../Utils/queryBuilder';

// store product info into data base
const saveBookData_DB = async (bookInfo: TBook) => {
    const result = await BookModel.create(bookInfo);
    return result;
};

// get all products from database
const getAllBookFrom_DB = async (query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder(BookModel.find(), query)
        .search(['title', 'author', 'category'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await studentQuery.countTotal();
    const data = await studentQuery.modelQuery;

    return {
        meta,
        data
    };
};

// Get a Specific Book
const getSpecificBookFrom_DB = async (bookId: string) => {
    const result = await BookModel.findById(bookId);
    if (result?.isDeleted) {
        return 'not found';
    }
    return result;
};

// get specific book and update on DB
const updateBookOn_DB = async (
    payload: Record<string, string>,
    bookImage: string
) => {
    const result = await BookModel.findByIdAndUpdate(
        { _id: payload?.bookId },
        {
            $set: {
                ...(payload.title && { title: payload.title }),
                ...(payload.author && { author: payload.author }),
                ...(payload.price && { price: payload.price }),
                ...(payload.category && { category: payload.category }),
                ...(payload.description && {
                    description: payload.description
                }),
                ...(payload.quantity && { quantity: payload.quantity }),
                ...(payload.quantity &&
                    Number(payload.quantity) > 0 && { inStock: true }),
                ...(bookImage && { bookImage })
            }
        },
        {
            new: true
        }
    );
    return result;
};

// deleted form on DB
const deleteBookOn_DB = async (bookId: string) => {
    await BookModel.findByIdAndDelete({ _id: bookId });
};

const addReviewIntoDB = async (payload: TBookReview) => {
    const result = await ReviewModel.create(payload);
    return result;
};
const getAllReviewsFrom_DB = async (bookId: string) => {
    const result = await ReviewModel.find({ bookId }).sort({ createdAt: -1 });
    return result;
};
// export all product services

export const bookServices = {
    saveBookData_DB,
    getAllBookFrom_DB,
    getSpecificBookFrom_DB,
    updateBookOn_DB,
    deleteBookOn_DB,
    addReviewIntoDB,
    getAllReviewsFrom_DB
};
