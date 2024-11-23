import { BookModel } from '../books/book.schema';
import TOrder from './order.interfase';
import { OrderModel } from './order.schema';

// make a order and save info id db
const saveOrderDataIn_DB = async (orderInfo: TOrder) => {
    const { product, quantity } = orderInfo;
    const isBookExist = await BookModel.findOne({ _id: product });
    if (!isBookExist || isBookExist?.isDeleted) {
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

//  Calculate Revenue from Orders
const calculateRevenueOrdersOn_DB = async () => {
    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: 'null',
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ]);
    return result;
};

// export order services
export const orderServices = {
    saveOrderDataIn_DB,
    calculateRevenueOrdersOn_DB,
};
