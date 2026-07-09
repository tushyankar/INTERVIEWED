import prisma from '../../../lib/prisma.js';

/**
 * ================================================================
 * Dashboard Repository
 * ================================================================
 */

export async function getDashboardData(
  userId: string,
) {
  const [
    user,
    analytics,
    latestResume,
    recentInterviews,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
    }),

    prisma.analytics.findUnique({
      where: {
        userId,
      },
    }),

    prisma.resume.findFirst({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },

      select: {
        id: true,
        originalName: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.interview.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 5,

      select: {
        id: true,
        role: true,
        difficulty: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    user,
    analytics,
    latestResume,
    recentInterviews,
  };
}
