import prisma from '../../../lib/prisma.js';

import {
  CreateInterviewInput,
  DeleteInterviewInput,
} from '../types/interview.types.js';

export async function createInterview(
  data: CreateInterviewInput,
) {
  return prisma.interview.create({
    data: {
      userId: data.userId,
      role: data.role,
      difficulty: data.difficulty,
    },
  });
}

export async function getInterviewById(
  id: string,
) {
  return prisma.interview.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  });
}

export async function getUserInterviews(
  userId: string,
) {
  return prisma.interview.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function deleteInterview({
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