import { z } from 'zod';

/**
 * ================================================================
 * Evaluation Schema
 * ================================================================
 */

export const EvaluationSchema = z.object({
  score: z.number().min(0).max(100),

  technicalAccuracy: z.string(),

  communication: z.string(),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  improvements: z.array(z.string()),

  feedback: z.string(),
});

export type EvaluationResult = z.infer<
  typeof EvaluationSchema
>;
