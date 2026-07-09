import prisma from '../../../lib/prisma.js';

export interface CreateResponseInput {
  questionId: string;
  transcript?: string;
  videoUrl?: string;
}

/**
 * ================================================================
 * Create Response
 * ================================================================
 */
export async function createResponse(
  data: CreateResponseInput,
) {
  return prisma.response.create({
    data: {
      questionId: data.questionId,
      transcript: data.transcript,
      videoUrl: data.videoUrl,
    },
  });
}

/**
 * ================================================================
 * Find Response By Question
 * ================================================================
 */
export async function findResponseByQuestionId(
  questionId: string,
) {
  return prisma.response.findFirst({
    where: {
      questionId,
    },
  });
}

/**
 * ================================================================
 * Update Response
 * ================================================================
 */
export async function updateResponse(
  responseId: string,
  transcript: string,
) {
  return prisma.response.update({
    where: {
      id: responseId,
    },
    data: {
      transcript,
    },
  });
}

/**
 * ================================================================
 * Get Interview Responses
 * ================================================================
 */
export async function getInterviewResponses(
  interviewId: string,
) {
  return prisma.response.findMany({
    where: {
      question: {
        interviewId,
      },
    },
    include: {
      question: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}
