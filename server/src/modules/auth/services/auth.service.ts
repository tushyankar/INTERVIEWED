import ApiError from '../../../utils/ApiError.js';

import {
  createRefreshToken,
  createUser,
  deleteUserRefreshTokens,
  findCurrentUser,
  findRefreshToken,
  findUserByEmail,
} from '../repositories/auth.repository.js';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js';

import {
  comparePassword,
  hashPassword,
} from '../utils/password.js';

import type {
  LoginInput,
  SignupInput,
} from '../validators/auth.validator.js';

export async function signup(data: SignupInput) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new ApiError(409, 'User already exists.');
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    fullName: data.fullName,
    email: data.email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function login(data: LoginInput) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const passwordMatches = await comparePassword(
    data.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await createRefreshToken(
    user.id,
    refreshToken,
    expiresAt,
  );

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await findCurrentUser(userId);

  if (!user) {
    throw new ApiError(404, 'User not found.');
  }

  return user;
}

export async function refreshAccessToken(token: string) {
  const storedToken = await findRefreshToken(token);

  if (!storedToken) {
    throw new ApiError(401, 'Refresh token not found.');
  }

  if (storedToken.revoked) {
    throw new ApiError(401, 'Refresh token has been revoked.');
  }

  if (storedToken.expiresAt < new Date()) {
    throw new ApiError(401, 'Refresh token has expired.');
  }

  const payload = verifyRefreshToken(token);

  return generateAccessToken({
    userId: payload.userId,
    email: payload.email,
  });
}

export async function logout(refreshToken: string) {
  const storedToken = await findRefreshToken(refreshToken);

  if (!storedToken) {
    return {
      success: true,
    };
  }

  await deleteUserRefreshTokens(storedToken.userId);

  return {
    success: true,
  };
}
