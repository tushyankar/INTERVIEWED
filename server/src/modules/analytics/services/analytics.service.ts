import {
  getUserScores,
  upsertAnalytics,
} from '../repositories/analytics.repository.js';

import prisma from '../../../lib/prisma.js';

/**
 * ================================================================
 * Update Analytics
 * ================================================================
 */

export async function updateAnalytics(
  userId: string,
) {
  const scores =
    await getUserScores(userId);

  if (scores.length === 0) {
    return null;
  }

  const values = scores
    .map((item) => item.score ?? 0);

  const averageScore =
    values.reduce(
      (sum, score) => sum + score,
      0,
    ) / values.length;

  /**
   * ------------------------------------------------
   * Highest Scoring Response
   * ------------------------------------------------
   */

  const strongest =
    await prisma.response.findFirst({
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

      include: {
        question: true,
      },

      orderBy: {
        score: 'desc',
      },
    });

  /**
   * ------------------------------------------------
   * Lowest Scoring Response
   * ------------------------------------------------
   */

  const weakest =
    await prisma.response.findFirst({
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

      include: {
        question: true,
      },

      orderBy: {
        score: 'asc',
      },
    });

  return upsertAnalytics(
    userId,
    Number(averageScore.toFixed(2)),
    strongest?.question.questionText ??
      'N/A',
    weakest?.question.questionText ??
      'N/A',
  );
}

/**
 * ================================================================
 * Get User Analytics
 * ================================================================
 */

export async function getAnalytics(
  userId: string,
) {
  return prisma.analytics.findUnique({
    where: {
      userId,
    },
  });
}
