import { z } from 'zod';

/**
 * ================================================================
 * Resume Intelligence Schema
 * ================================================================
 */

const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  location: z.string().optional().nullable(),
  description: z.array(z.string()),
});

const ProjectSchema = z.object({
  name: z.string(),
  technologies: z.array(z.string()),
  description: z.string(),
  highlights: z.array(z.string()),
});

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  duration: z.string(),
  cgpa: z.string().optional().nullable(),
});

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

  experience: z.array(
    ExperienceSchema,
  ),

  projects: z.array(
    ProjectSchema,
  ),

  education: z.array(
    EducationSchema,
  ),

  certifications: z.array(
    z.string(),
  ),

  strengths: z.array(
    z.string(),
  ),

  recommendedRoles: z.array(
    z.string(),
  ),
});

export type ResumeAnalysis =
  z.infer<
    typeof ResumeSchema
  >;
