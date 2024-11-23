import express from 'express';
import { orderController } from './order.controller';
const orderRouter = express.Router();

// make a order
orderRouter.post('/', orderController.makeOrder);

// export orderRouter
export default orderRouter;
