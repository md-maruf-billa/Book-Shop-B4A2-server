import { ObjectId } from 'mongoose';

// define a order data type
type TOrder = {
    email: string;
    name?:string;
    address: string;
    product: ObjectId | string;
    orderNote: string;
    orderStatus: 'Pending' | 'Paid' | 'Cancelled' | 'Completed';
    orderInfo?: {
        orderId: string;
        transactionStatus: string;
        sp_code: string;
        sp_message: string;
        orderInfoStatus: string;
        verifyPaymentRes: string;
        method: string;
        date_time: string;
    };
    quantity: number;
    price: number;
    totalPrice?: number;
    createdAt?: string;
    updatedAt?: string;
};

export default TOrder;
