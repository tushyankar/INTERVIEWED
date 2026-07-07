import prisma from '../../../lib/prisma.js';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createUser(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data,
  });
}

export async function createRefreshToken(
  userId: string,
  token: string,
  expiresAt: Date,
) {
  return prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
}

export async function revokeRefreshToken(token: string) {
  return prisma.refreshToken.update({
    where: {
      token,
    },
    data: {
      revoked: true,
    },
  });
}

export async function deleteUserRefreshTokens(userId: string) {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
}

export async function findCurrentUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });
}