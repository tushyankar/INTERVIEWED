import { z } from 'zod';

/**
 * ================================================================
 * Resume Intelligence Schema
 * ================================================================
 *
 * Every Gemini response MUST satisfy this schema.
 */

export const ResumeSchema = z.object({
  candidate: z.object({
    name: z.string(),

    email: z.string().nullable().optional(),

    phone: z.string().nullable().optional(),

    location: z.string().nullable().optional(),
  }),

  summary: z.string(),

  careerLevel: z.enum([
    'Student',
    'Fresher',
    'Junior',
    'Mid',
    'Senior',
  ]),

  skills: z.object({
    languages: z.array(z.string()),

    frameworks: z.array(z.string()),

    libraries: z.array(z.string()),

    databases: z.array(z.string()),

    tools: z.array(z.string()),

    cloud: z.array(z.string()),

    devops: z.array(z.string()),
  }),

  experience: z.array(z.any()),

  projects: z.array(z.any()),

  education: z.array(z.any()),

  certifications: z.array(z.string()),

  strengths: z.array(z.string()),

  recommendedRoles: z.array(z.string()),
});

export type ResumeAnalysis = z.infer<
  typeof ResumeSchema
>;