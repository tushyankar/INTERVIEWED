import { z } from 'zod';

/**
 * ================================================================
 * Interview Question Schema
 * ================================================================
 *
 * Validates AI-generated interview questions.
 */

export const InterviewQuestionSchema = z.object({
  question: z.string().min(10),

  topic: z.string(),

  difficulty: z.enum([
    'Easy',
    'Medium',
    'Hard',
  ]),
});

export const InterviewSchema = z.object({
  questions: z
    .array(InterviewQuestionSchema)
    .length(10),
});

export type InterviewAnalysis = z.infer<
  typeof InterviewSchema
>;
