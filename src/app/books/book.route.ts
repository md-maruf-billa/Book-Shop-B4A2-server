import express from 'express';
import bookController from './book.controller';
// create a express router for products route
const bookRouter = express.Router();

// create a book in db
bookRouter.post('/', bookController.createBook);
// get all book
bookRouter.get('/', bookController.getAllBooks);
//  get Specific Book From_DB
bookRouter.get('/:productId', bookController.getSpecificBook);

// get Specific Book and update id
bookRouter.put('/:productId', bookController.updateBook);

// export product router
export default bookRouter;
