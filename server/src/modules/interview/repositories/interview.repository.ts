import prisma from '../../../lib/prisma.js';

import type {
  CreateInterviewInput,
  DeleteInterviewInput,
} from '../types/interview.types.js';

export interface AIQuestion {
  question: string;
  topic: string;
  difficulty: string;
}

/**
 * ================================================================
 * Create Interview + Questions
 * ================================================================
 */
export async function createInterview(
  data: CreateInterviewInput,
  questions: AIQuestion[] = [],
) {
  return prisma.interview.create({
    data: {
      userId: data.userId,
      role: data.role,
      difficulty: data.difficulty,

      questions: {
        create: questions.map((question, index) => ({
          questionText: question.question,
          order: index + 1,
          aiGenerated: true,
        })),
      },
    },

    include: {
      questions: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
}

/**
 * ================================================================
 * Find Interview
 * ================================================================
 */
export async function findInterviewById(
  id: string,
) {
  return prisma.interview.findUnique({
    where: {
      id,
    },

    include: {
      questions: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
}

/**
 * ================================================================
 * User Interviews
 * ================================================================
 */
export async function findUserInterviews(
  userId: string,
) {
  return prisma.interview.findMany({
    where: {
      userId,
    },

    include: {
      questions: true,
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * ================================================================
 * Delete Interview
 * ================================================================
 */
export async function removeInterview({
  interviewId,
  userId,
}: DeleteInterviewInput) {
  return prisma.interview.deleteMany({
    where: {
      id: interviewId,
      userId,
    },
  });
}
