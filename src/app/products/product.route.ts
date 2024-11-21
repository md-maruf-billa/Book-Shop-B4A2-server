import express from 'express';
import productsController from './product.controller';
// create a express router for products route
const productsRouter = express.Router();

// create a product
productsRouter.post('/',productsController.createProducts);

// export product router
export default productsRouter;
