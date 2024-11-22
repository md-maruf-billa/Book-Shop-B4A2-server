import { Request, Response } from 'express';
import { validateBookSchemaByZod } from './book.schema';
import { TBook } from './book.interface';
import { bookServices } from './book.service';

// create products
const createBook = async (req: Request, res: Response) => {
    try {
        const productInfo: TBook = req?.body;
        const validateProductInfo = validateBookSchemaByZod.parse(productInfo);
        const result = await bookServices.saveBookData_DB(validateProductInfo);
        res.status(200).send({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
    } catch (err: any) {
        res.status(400).send({
            message: 'Validation failed',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// get all products
const getAllBooks = async (req: Request, res: Response) => {
    try {
        const query: string = req?.query.searchTerm?.toString() || '';
        const result = await bookServices.getAllBookFrom_DB(query);
        res.status(200).send({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    } catch (err: any) {
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// get Specific Book
const getSpecificBook = async (req: Request, res: Response) => {
    try {
        const bookId = req?.params?.productId;
        const result = await bookServices.getSpecificBookFrom_DB(bookId);
        res.status(200).send({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    } catch (err: any) {
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// get specific book and update it
const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId: string = req?.params?.productId;
        const updateData: object = req.body;
        const result = await bookServices.updateBookOn_DB(bookId, updateData);
        res.status(200).send({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    } catch (err: any) {
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// delete a book
const deleteBook = async (req: Request, res: Response) => {
    const bookId: string = req?.params?.productId;
}

// export all controllers
const bookController = {
    createBook,
    getAllBooks,
    getSpecificBook,
    updateBook,
    deleteBook
};

export default bookController;
