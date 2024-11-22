import { Schema, model } from 'mongoose';
import { z } from 'zod';
import { TProducts } from './product.interface';

// Extend TProducts to include createdAt
export interface TProductsWithDate extends TProducts {
    createdAt: string;
}

// Define the Mongoose schema
const productSchema = new Schema<TProductsWithDate>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be greater than 0'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: [
                    'Fiction',
                    'Science',
                    'SelfDevelopment',
                    'Poetry',
                    'Religious',
                ],
                message: '{VALUE} is not a valid category',
            },
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [10, 'Description must be at least 10 characters long'], // Updated to match Zod validation
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [0, 'Quantity must be greater than 0'],
        },
        inStock: {
            type: Boolean,
            required: [true, 'InStock is required'],
        },
        createdAt: {
            type: String,
            required: false, // Auto-added by middleware, not required from client
        },
    },
    { strict: true },
);

// Zod validation schema
export const validateProductSchemaByZod = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    author: z.string().min(1, { message: 'Author is required' }),
    price: z.number().min(0, { message: 'Price must be grater 0' }),
    category: z.enum(
        ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
        {
            message:
                'Category must be one of: Fiction, Science, SelfDevelopment, Poetry, Religious',
        },
    ),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters' }),
    quantity: z
        .number()
        .int({ message: 'Quantity must be Number' })
        .min(0, { message: 'Quantity must be grater 0' }),
    inStock: z.boolean({ required_error: 'InStock field is required' }),
});

// Mongoose middleware to add `createdAt` before saving
productSchema.pre('save', function (next) {
    this.createdAt = new Date().toISOString();
    next();
});

// Create and export the model
export const ProductsModel = model<TProductsWithDate>('Product', productSchema);
