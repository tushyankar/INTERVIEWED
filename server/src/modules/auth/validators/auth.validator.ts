import { z } from 'zod';

export const signupSchema = z.object({
  fullName: z.string().min(3).max(100),

  email: z.string().email(),

  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;