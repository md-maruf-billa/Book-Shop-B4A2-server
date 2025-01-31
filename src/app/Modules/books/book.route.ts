import express, { Request, Response, NextFunction } from 'express';
import bookController from './book.controller';
import validateRequest from '../../Middleware/valideteRequest';
import { bookValidations } from './book.validation';
import upload from '../../Utils/multer.config';
import auth from '../../Middleware/auth';
// create a express router for products route
const bookRouter = express.Router();

// get all book
bookRouter.get('/', bookController.getAllBooks);
//  get Specific Book From_DB
bookRouter.get('/:productId', bookController.getSpecificBook);

// delete a book
bookRouter.delete('/delete-book/:productId',auth("admin"), bookController.deleteBook);
// create a book in db
bookRouter.post(
    '/',
    upload.single('image'), // Upload the image to Cloudinary
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(bookValidations.createBookValidationZodSchema),
    bookController.createBook
);
bookRouter.put(
    '/update-book',
    auth('admin'),
    upload.single('image'), // Upload the image to Cloudinary
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(bookValidations.updateBookSchema),
    bookController.updateBook
);

//  for review
bookRouter.post(
    '/review',
    validateRequest(bookValidations.bookReviewSchema),
    bookController.setReview
);

bookRouter.get(`/review/:bookId`, bookController.getAllReviews);

// export product router
export default bookRouter;
