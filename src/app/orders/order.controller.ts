import { Request, Response } from 'express';
import { orderValidationSchemaWithZod } from './order.schema';
import TOrder from './order.interfase';
import { orderServices } from './order.service';
// make a order
const makeOrder = async (req: Request, res: Response) => {
    try {
        const orderInfo: TOrder = req.body;
        const validOrderInfo = orderValidationSchemaWithZod.parse(orderInfo);
        const result = await orderServices.saveOrderDataIn_DB(validOrderInfo);
        if (result == 'out of stock' || result == 'not found') {
            res.status(404).send({
                message: 'Opps !! This Book now' + result,
                success: false,
            });
        } else {
            res.status(200).send({
                message: 'Order created successfully',
                status: true,
                data: result,
            });
        }
    } catch (err: any) {
        res.status(400).send({
            message: 'Validation failed',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

export const orderController = {
    makeOrder,
};
