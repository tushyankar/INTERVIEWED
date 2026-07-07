import { z } from 'zod';

export const ResumeSchema = z.object({
  summary: z.string(),

  skills: z.array(z.string()),

  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      duration: z.string(),
      description: z.string(),
    }),
  ),

  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      year: z.string(),
    }),
  ),

  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
    }),
  ),

  certifications: z.array(z.string()),
});

export type ResumeAIResult = z.infer<typeof ResumeSchema>;
