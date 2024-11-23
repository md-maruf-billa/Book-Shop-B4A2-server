import express from 'express';
import { orderController } from './order.controller';
const orderRouter = express.Router();

// make a order
orderRouter.post('/', orderController.makeOrder);
orderRouter.get("/revenue", orderController.calculateRevenue)

// export orderRouter
export default orderRouter;
