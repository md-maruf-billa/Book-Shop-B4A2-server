import { BookModel } from '../books/book.schema';
import TOrder from './order.interfase';
import { OrderModel } from './order.schema';
import { orderUtils } from './order.utils';

// make a order and save info id db
const saveOrderDataIn_DB = async (orderInfo: TOrder, ip: string) => {
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
    let result = await OrderModel.create({
        ...orderInfo,
        totalPrice: orderInfo.quantity * orderInfo.price
    });

    //shurjopay payload
    const shurjopayPayload = {
        amount: result.totalPrice,
        order_id: result._id,
        currency: 'BDT',
        customer_name: orderInfo.name,
        customer_address: orderInfo.address,
        customer_email: orderInfo.email,
        customer_phone: 'N/A',
        customer_city: orderInfo.address,
        client_ip: ip
    };
    const orderRes = await orderUtils.makePament(shurjopayPayload);
    if (orderRes.transactionStatus) {
        result = await result.updateOne({
            orderInfo: {
                orderId: orderRes.sp_order_id,
                transactionStatus: orderRes.transactionStatus
            }
        });
    }

    return orderRes.checkout_url;
};
const getAllOrderFrom_DB = async (payload: string) => {
    const result = await OrderModel.find({ email: payload });
    return result;
};

//  Calculate Revenue from Orders
const calculateRevenueOrdersOn_DB = async () => {
    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: 'null',
                totalRevenue: { $sum: '$totalPrice' }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return result;
};
const verifyOrderOn_DB = async (orderId: string) => {
    const verifyPaymentRes = await orderUtils.verifyPayment(orderId);

    if (verifyPaymentRes.length) {
        await OrderModel.findOneAndUpdate(
            { 'orderInfo.orderId': orderId },
            {
                'orderInfo.bank_status': verifyPaymentRes[0].bank_status,
                'orderInfo.sp_code': verifyPaymentRes[0].sp_code,
                'orderInfo.sp_message': verifyPaymentRes[0].sp_message,
                'orderInfo.orderInfoStatus':
                    verifyPaymentRes[0].transaction_status,
                'orderInfo.method': verifyPaymentRes[0].method,
                'orderInfo.date_time': verifyPaymentRes[0].date_time,
                orderStatus:
                    verifyPaymentRes[0].bank_status == 'Success'
                        ? 'Paid'
                        : verifyPaymentRes[0].bank_status == 'Failed'
                        ? 'Pending'
                        : verifyPaymentRes[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : ''
            }
        );
    }

    return verifyPaymentRes;
};

const getAllOrdersFrom_DB_For_Admin = async () => {
    const result = await OrderModel.find();
    return result;
};

const updateOrderStatusOn_DB = async (id: string) => {
    const orderStatus = await OrderModel.findByIdAndUpdate(id, {
        orderStatus: 'Completed'
    });
    return orderStatus
};

// export order services
export const orderServices = {
    saveOrderDataIn_DB,
    calculateRevenueOrdersOn_DB,
    verifyOrderOn_DB,
    getAllOrderFrom_DB,
    getAllOrdersFrom_DB_For_Admin,
    updateOrderStatusOn_DB
};
