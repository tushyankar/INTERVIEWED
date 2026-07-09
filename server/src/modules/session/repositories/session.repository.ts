import prisma from '../../../lib/prisma.js';

/**
 * ================================================================
 * Session Repository
 * ================================================================
 */

export async function getInterviewSession(
  interviewId: string,
) {
  return prisma.interview.findUnique({
    where: {
      id: interviewId,
    },

    include: {
      questions: {
        orderBy: {
          order: 'asc',
        },

        include: {
          responses: true,
        },
      },
    },
  });
}
