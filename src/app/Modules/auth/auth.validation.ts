import { z } from 'zod';

const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    role: z.literal('user')
});

const loginUserSchema = z.object({
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.')
})

export const userValidation = {
    createUserSchema,
    loginUserSchema
};
