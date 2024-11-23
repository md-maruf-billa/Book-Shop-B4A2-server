import { BookModel } from '../books/book.schema';
import TOrder from './order.interfase';
import { OrderModel } from './order.schema';

// make a order and save info id db
const saveOrderDataIn_DB = async (orderInfo: TOrder) => {
    const { product, quantity } = orderInfo;
    const isBookExist = await BookModel.findOne({ _id: product });
    if (!isBookExist) {
        return 'not found';
    }
    if (isBookExist.quantity < quantity) {
        return 'out of stock';
    }
    isBookExist.quantity -= quantity;
    if (isBookExist.quantity == 0) {
        isBookExist.inStock = false;
    }
    await isBookExist.save();
    const result = await OrderModel.create(orderInfo);
    return result;
};

// export order services
export const orderServices = {
    saveOrderDataIn_DB,
};
