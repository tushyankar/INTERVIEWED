import type { NextFunction, Request, Response } from 'express';

import * as authService from '../services/auth.service.js';
import {
  loginSchema,
  signupSchema,
} from '../validators/auth.validator.js';

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = signupSchema.parse(req.body);

    const user = await authService.signup(data);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/v1/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies?.refreshToken as string | undefined;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Refresh token is missing.',
      });
      return;
    }

    const accessToken = await authService.refreshAccessToken(token);

    res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully.',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies?.refreshToken as string | undefined;

    if (token) {
      await authService.logout(token);
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/v1/auth',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
}