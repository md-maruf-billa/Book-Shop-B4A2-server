import { z } from 'zod';

const userZodValidationSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    role: z.enum(['user'], {
        errorMap: () => ({ message: "Role must be 'user'." })
    }),
    profileImage: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export const userValidationSchamas ={
      userZodValidationSchema
}