import mongoose, { Schema, model } from 'mongoose';

import z from 'zod';
import TOrder from './order.interfase';

const OrderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
            ref: 'User',
            required: true
        },
        name: { type: String, required: false },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        address: {
            type: String
        },
        orderNote: { type: String, required: false },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: false
        },
        createdAt: {
            type: String,
            required: false
        },
        updatedAt: {
            type: String,
            required: false
        },
        orderInfo: {
            orderId: String,
            transactionStatus: String,
            sp_code: String,
            sp_message: String,
            orderInfoStatus: String,
            verifyPaymentRes: String,
            method: String,
            date_time: String
        },
        orderStatus: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
            default: 'Pending'
        }
    },
    {
        versionKey: false
    }
);

// Mongoose middleware to add `createdAt` before saving
OrderSchema.pre('save', function (next) {
    const now = new Date().toISOString();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.updatedAt = now;
    next();
});

export const OrderModel = model<TOrder>('orders', OrderSchema);
