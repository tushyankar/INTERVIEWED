import { Prisma, ResumeStatus } from '@prisma/client';

import prisma from '../../../lib/prisma.js';

export interface CreateResumeInput {
  userId: string;

  originalName: string;

  filename: string;

  filePath: string;

  mimeType: string;

  size: number;

  extractedText: string;

  isActive: boolean;
}

/**
 * ============================================================
 * Create Resume
 * ============================================================
 */

export async function createResume(
  data: CreateResumeInput,
) {
  return prisma.resume.create({
    data,
  });
}

/**
 * ============================================================
 * Resume Status
 * ============================================================
 */

export async function updateResumeStatus(
  resumeId: string,
  status: ResumeStatus,
) {
  return prisma.resume.update({
    where: {
      id: resumeId,
    },
    data: {
      status,
    },
  });
}

/**
 * ============================================================
 * AI Analysis
 * ============================================================
 */

export async function updateResumeAIAnalysis(
  resumeId: string,
  aiAnalysis: Prisma.InputJsonValue,
) {
  return prisma.resume.update({
    where: {
      id: resumeId,
    },
    data: {
      aiAnalysis,
      status: ResumeStatus.COMPLETED,
    },
  });
}

/**
 * ============================================================
 * Queries
 * ============================================================
 */

export async function findResumeById(
  id: string,
) {
  return prisma.resume.findUnique({
    where: {
      id,
    },
  });
}

export async function findLatestResumeByUserId(
  userId: string,
) {
  return prisma.resume.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findActiveResumeByUserId(
  userId: string,
) {
  return prisma.resume.findFirst({
    where: {
      userId,
      isActive: true,
    },
  });
}

export async function findAllResumesByUserId(
  userId: string,
) {
  return prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        isActive: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
  });
}

/**
 * ============================================================
 * Active Resume
 * ============================================================
 */

export async function clearActiveResume(
  userId: string,
) {
  return prisma.resume.updateMany({
    where: {
      userId,
    },
    data: {
      isActive: false,
    },
  });
}

export async function setActiveResume(
  resumeId: string,
) {
  return prisma.resume.update({
    where: {
      id: resumeId,
    },
    data: {
      isActive: true,
    },
  });
}

/**
 * ============================================================
 * Delete
 * ============================================================
 */

export async function deleteResume(
  id: string,
) {
  return prisma.resume.delete({
    where: {
      id,
    },
  });
}
