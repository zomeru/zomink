import { object, z } from 'zod';

export const loginUserSchema = object({
  email: z
    .string({
      required_error: 'Email or username is required',
    })
    .min(1, 'Email or username is required'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
});

export const createUserSchema = object({
  username: z.string({}).min(6, 'Username must be at least 6 characters long'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  passwordConfirmation: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});
