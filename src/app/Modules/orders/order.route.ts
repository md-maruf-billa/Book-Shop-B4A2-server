import express from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../Middleware/valideteRequest';
import { orderValidationSchema } from './order.validation';
import auth from '../../Middleware/auth';
const orderRouter = express.Router();

// make a order
orderRouter.post(
    '/',
    auth('user'),
    validateRequest(orderValidationSchema.createOrderValidation),
    orderController.makeOrder
);
orderRouter.get('/verify-order/:orderId', orderController.verifyOrder);

orderRouter.get(
    '/get-orders/:userEmail',
    auth('user'),
    orderController.getAllOrder
);
orderRouter.get('/revenue', orderController.calculateRevenue);
orderRouter.get("/all-orders", auth("admin"), orderController.getAllOrders_For_Admin)

orderRouter.put("/update-order-status/:orderId", auth("admin"),orderController.updateOrderStauts)

// export orderRouter
export default orderRouter;
