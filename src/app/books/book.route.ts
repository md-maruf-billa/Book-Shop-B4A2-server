import express from 'express';
import bookController from './book.controller';
// create a express router for products route
const bookRouter = express.Router();


// get all book
bookRouter.get('/', bookController.getAllBooks);
//  get Specific Book From_DB
bookRouter.get('/:productId', bookController.getSpecificBook);

// get Specific Book and update id
bookRouter.put('/:productId', bookController.updateBook);

// delete a book
bookRouter.delete('/:productId', bookController.deleteBook);
// create a book in db
bookRouter.post('/', bookController.createBook);

// export product router
export default bookRouter;
