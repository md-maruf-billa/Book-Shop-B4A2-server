// save product data in db

import { BookModel } from './book.schema';
import { TBook } from './book.interface';

// store product info into data base
const saveBookData_DB = async (bookInfo: TBook) => {
    const result = await BookModel.create(bookInfo);
    return result;
};

// get all products from database
const getAllBookFrom_DB = async (searchTerm: string) => {
    // if have query param
    const query = searchTerm
        ? {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};
    const result = await BookModel.find(query);
    return result;
};

// Get a Specific Book
const getSpecificBookFrom_DB = async (bookId: string) => {
    const result = await BookModel.findById(bookId);
    return result;
};

// get specific book and update on DB
const updateBookOn_DB = async (bookId: string, updateData: object) => {
    const result = await BookModel.findOneAndUpdate({ _id: bookId }, updateData, {
        new: true,
        runValidators: true
    });
    return result;
};

// deleted form on DB
const deleteBookOn_DB = async (bookId: string) => {
    await BookModel.findOneAndUpdate({ _id: bookId }, { isDeleted: true })
}

// export all product services

export const bookServices = {
    saveBookData_DB,
    getAllBookFrom_DB,
    getSpecificBookFrom_DB,
    updateBookOn_DB,
    deleteBookOn_DB
};
