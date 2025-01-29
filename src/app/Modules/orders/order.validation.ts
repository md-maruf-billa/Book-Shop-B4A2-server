import mongoose from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z
    .string()
    .refine(value => mongoose.isValidObjectId(value), {
        message: 'Invalid ObjectId format'
    });

// zod validation for OrderSchema
const createOrderValidation = z.object({
    email: z.string().email('Invalid email address'),
    address: z.string(),
    orderNote: z.string().optional(),
    product: objectIdSchema,
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    totalPrice: z.number().optional(),
    price: z.number().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const orderValidationSchema = {
    createOrderValidation
};
