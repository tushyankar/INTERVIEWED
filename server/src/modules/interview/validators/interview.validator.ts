import { z } from 'zod';

export const createInterviewSchema = z.object({
  body: z.object({
    role: z
      .string()
      .trim()
      .min(2, 'Role must contain at least 2 characters.')
      .max(100, 'Role cannot exceed 100 characters.'),

    difficulty: z.enum([
      'Easy',
      'Medium',
      'Hard',
    ]),
  }),
});

export type CreateInterviewSchema = z.infer<
  typeof createInterviewSchema
>;
