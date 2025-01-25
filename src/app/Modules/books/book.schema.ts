import { Schema, model } from 'mongoose';
import { z } from 'zod';
import { TBook } from './book.interface';

// Define the Mongoose schema
const BookSchema = new Schema<TBook>(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        author: {
            type: String,
            required: [true, 'Author is required']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be greater than 0']
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
                    'Religious'
                ],
                message: '{VALUE} is not a valid category'
            }
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [10, 'Description must be at least 10 characters long']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [0, 'Quantity must be greater than 0']
        },
        inStock: {
            type: Boolean,
            required: [true, 'InStock is required']
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        strict: true,
        versionKey: false,
        timestamps: true
    }
);

// Zod validation schema
export const validateBookSchemaByZod = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    author: z.string().min(1, { message: 'Author is required' }),
    price: z.number().min(0, { message: 'Price must be greater than 0' }),
    category: z.enum(
        ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
        {
            message:
                'Category must be one of: Fiction, Science, SelfDevelopment, Poetry, Religious'
        }
    ),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters' }),
    quantity: z
        .number()
        .int({ message: 'Quantity must be a whole number' })
        .min(0, { message: 'Quantity must be greater than 0' }),
    inStock: z.boolean({ required_error: 'InStock field is required' }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    isDeleted: z.boolean().optional().default(false)
});



// filter out of already deleted data
BookSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// Create and export the model
export const BookModel = model<TBook>('Book', BookSchema);
