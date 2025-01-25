import { ObjectId } from 'mongoose';

// define a order data type
type TOrder = {
    // customer email type
    email: string;
    // product id
    product: ObjectId | string;
    // order quantity
    quantity: number;
    // total price -> quantity * product per price
    totalPrice: number;
    createdAt?: string;
    updatedAt?: string;
    isCanceled: boolean;
};

export default TOrder;
