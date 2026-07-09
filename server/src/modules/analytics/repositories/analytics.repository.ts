import prisma from '../../../lib/prisma.js';

/**
 * ================================================================
 * Get Analytics
 * ================================================================
 */

export async function findAnalyticsByUserId(
  userId: string,
) {
  return prisma.analytics.findUnique({
    where: {
      userId,
    },
  });
}

/**
 * ================================================================
 * Upsert Analytics
 * ================================================================
 */

export async function upsertAnalytics(
  userId: string,
  averageScore: number,
  strongestSkill: string,
  weakestSkill: string,
) {
  return prisma.analytics.upsert({
    where: {
      userId,
    },

    create: {
      userId,
      averageScore,
      interviewsTaken: 1,
      strongestSkill,
      weakestSkill,
    },

    update: {
      averageScore,
      interviewsTaken: {
        increment: 1,
      },
      strongestSkill,
      weakestSkill,
    },
  });
}

/**
 * ================================================================
 * User Response Scores
 * ================================================================
 */

export async function getUserScores(
  userId: string,
) {
  return prisma.response.findMany({
    where: {
      question: {
        interview: {
          userId,
        },
      },

      score: {
        not: null,
      },
    },

    select: {
      score: true,
    },
  });
}
