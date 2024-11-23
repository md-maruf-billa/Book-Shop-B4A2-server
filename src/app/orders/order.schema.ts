import mongoose, { Schema, model } from 'mongoose';

import z from 'zod';
import TOrder from './order.interfase';

const OrderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: String,
        required: false,
    },
    updatedAt: {
        type: String,
        required: false,
    },
    isCanceled: {
        type: Boolean,
        default: false,
    },
},{
    versionKey:false
});

// Mongoose middleware to add `createdAt` before saving
OrderSchema.pre('save', function (next) {
    const now = new Date().toISOString();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.updatedAt = now;
    next();
});

const objectIdSchema = z
    .string()
    .refine((value) => mongoose.isValidObjectId(value), {
        message: 'Invalid ObjectId format',
    });

// zod validation for OrderSchema
export const orderValidationSchemaWithZod = z.object({
    email: z.string().email('Invalid email address'),
    product: objectIdSchema,
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    totalPrice: z.number().min(0, 'Total price must be at least 1'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    isCanceled: z.boolean().default(false),
});

export const OrderModel = model<TOrder>('orders', OrderSchema);
