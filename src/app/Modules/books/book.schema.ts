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
        bookImage: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: [
                    'Fiction',
                    'NonFiction',
                    'Science',
                    'SelfDevelopment',
                    'Poetry',
                    'Religious',
                    'Biography',
                    'Fantasy',
                    'History',
                    'Thriller',
                    'Mystery'
                ],
                message: '{VALUE} is not a valid category'
            }
        },
        exchangeable: {
            type: String,
            enum: {
                values: ['Exchangeable', 'Non Exchangeable'],
                message: '{VALUE} is not a valid exchangeble status'
            },
            required: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [10, 'Description must be at least 10 characters long']
        },
        publishYear: {
            type: Number,
            required: [true, 'Publish Year is required']
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

// filter out of already deleted data
BookSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// Create and export the model
export const BookModel = model<TBook>('Book', BookSchema);
