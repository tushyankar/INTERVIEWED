import prisma from '../../../lib/prisma.js';

export interface CreateResumeInput {
  userId: string;
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  extractedText: string;
}

export async function createResume(data: CreateResumeInput) {
  return prisma.resume.create({
    data: {
      userId: data.userId,
      originalName: data.originalName,
      filename: data.filename,
      mimeType: data.mimeType,
      size: data.size,
      extractedText: data.extractedText,
    },
  });
}

export async function findResumeById(id: string) {
  return prisma.resume.findUnique({
    where: {
      id,
    },
  });
}

export async function findLatestResumeByUserId(userId: string) {
  return prisma.resume.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findAllResumesByUserId(userId: string) {
  return prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function deleteResume(id: string) {
  return prisma.resume.delete({
    where: {
      id,
    },
  });
}
