import { Request, Response } from 'express';
import TOrder from './order.interfase';
import { orderServices } from './order.service';
import catchAsync from '../../Utils/catchAsync';
import manageResponse from '../../Utils/manageResponse';
import status from 'http-status';
// make a order
const makeOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await orderServices.saveOrderDataIn_DB(
        req.body,
        req.ip as string
    );
    manageResponse(res, status.OK, 'Order saved successfully', result);
});

const verifyOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await orderServices.verifyOrderOn_DB(orderId);
    manageResponse(res, status.OK, 'Order verified successfully', result);
});
const getAllOrder = catchAsync(async (req, res) => {
    const { userEmail } = req?.params;
    const result = await orderServices.getAllOrderFrom_DB(userEmail);
    manageResponse(res, status.OK, 'Orders retrieved successfully', result);
});

//  Calculate Revenue from Orders
const calculateRevenue = async (req: Request, res: Response) => {
    try {
        const result = await orderServices.calculateRevenueOrdersOn_DB();
        res.status(200).send({
            message: 'Revenue calculated successfully',
            status: true,
            data: result[0]
        });
    } catch (err: any) {
        res.status(400).send({
            message: 'Validation failed',
            success: false,
            error: err,
            stack: err?.stack
        });
    }
};

const getAllOrders_For_Admin = catchAsync(async(req,res) => {
    const result = await orderServices.getAllOrdersFrom_DB_For_Admin();
    manageResponse(res, status.OK, 'Orders retrieved successfully', result);
})

const updateOrderStauts = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await orderServices.updateOrderStatusOn_DB(orderId);
    manageResponse(res, status.OK, 'Order status updated successfully', result);
})

export const orderController = {
    makeOrder,
    calculateRevenue,
    verifyOrder,
    getAllOrder,
    getAllOrders_For_Admin,
    updateOrderStauts
};
