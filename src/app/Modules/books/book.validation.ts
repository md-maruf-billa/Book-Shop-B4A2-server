import { z } from 'zod';

const createBookValidationZodSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    author: z.string().min(1, { message: 'Author is required' }),
    price: z.number().min(0, { message: 'Price must be greater than 0' }),
    bookImage: z.string().optional(),
    category: z.enum(
        [
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
        {
            message:
                'Category must be one of: Fiction, NonFiction, Science, SelfDevelopment, Poetry, Religious, Biography, Fantasy, History, Thriller, Mystery'
        }
    ),
    publishYear: z.number({ message: 'Publish year is required' }),
    exchangeable: z.enum(['Exchangeable', 'Non Exchangeable'], {
        message: 'Exchangeable must be one of Exchange and Non Exchangeable'
    }),
    description: z
        .string(),
    quantity: z
        .number()
        .int({ message: 'Quantity must be a whole number' })
        .min(0, { message: 'Quantity must be greater than 0' }),
    inStock: z.boolean({ required_error: 'InStock field is required' })
});
const updateBookSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    bookImage: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional()
});

const bookReviewSchema = z.object({
    bookId: z.string().min(1), // assuming bookId is a string (could be number if needed)
    reviewerPhoto: z.string().optional(),
    reviewerName: z.string(),
    reviewerEmail: z.string(),
    empression: z.string(),
    feedBack: z.string(),
    rating: z.number()
});

export const bookValidations = {
    createBookValidationZodSchema,
    bookReviewSchema,
    updateBookSchema
};
