import { Request, Response } from 'express';
import { TBook } from './book.interface';
import catchAsync from '../../Utils/catchAsync';
import manageResponse from '../../Utils/manageResponse';
import status from 'http-status';
import { bookServices } from './book.service';

// create products
const createBook = catchAsync(async (req: Request, res: Response) => {
    const productInfo: TBook = req?.body;
    const result = await bookServices.saveBookData_DB({
        ...productInfo,
        bookImage: req?.file?.path
    });
    manageResponse(res, status.OK, 'Book Created Successfully', result);
});

// get all products
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const result = await bookServices.getAllBookFrom_DB(req.query);
    manageResponse(res, status.OK, 'Books Retrieved successfully', result);
});

// get Specific Book
const getSpecificBook = catchAsync(async (req: Request, res: Response) => {
    const bookId = req?.params?.productId;
    const result = await bookServices.getSpecificBookFrom_DB(bookId);
    manageResponse(res, status.OK, 'Book Retrieved successfully', result);
});

// get specific book and update it
const updateBook = catchAsync(async (req: Request, res: Response) => {
    const result = await bookServices.updateBookOn_DB(
        req.body,
        req?.file?.path!
    );
    manageResponse(res, status.OK, 'Book updated successfully', result);
});

// delete a book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const bookId: string = req?.params?.productId;
    await bookServices.deleteBookOn_DB(bookId);
    manageResponse(res,status.OK,"Book Deleted successfully", {})
});

const setReview = catchAsync(async (req: Request, res: Response) => {
    const result = await bookServices.addReviewIntoDB(req.body);
    manageResponse(res, status.OK, 'Review added successfully', result);
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req?.params;
    const result = await bookServices.getAllReviewsFrom_DB(bookId);
    manageResponse(res, status.OK, 'Reviews retrieved successfully', result);
});

// export all controllers
const bookController = {
    createBook,
    getAllBooks,
    getSpecificBook,
    updateBook,
    deleteBook,
    setReview,
    getAllReviews
};

export default bookController;
