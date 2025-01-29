import express from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../Middleware/valideteRequest';
import { orderValidationSchema } from './order.validation';
const orderRouter = express.Router();

// make a order
orderRouter.post(
    '/',
    validateRequest(orderValidationSchema.createOrderValidation),
    orderController.makeOrder
);
orderRouter.get("/verify-order/:orderId", orderController.verifyOrder)
orderRouter.get('/revenue', orderController.calculateRevenue);

// export orderRouter
export default orderRouter;
