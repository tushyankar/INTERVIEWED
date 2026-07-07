import type { NextFunction, Request, Response } from 'express';

import ApiError from '../utils/ApiError.js';
import { verifyAccessToken } from '../modules/auth/utils/jwt.js';

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ApiError(401, 'Authorization header is missing.');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new ApiError(
        401,
        'Authorization header must use the Bearer scheme.',
      );
    }

    const token = authorization.slice(7);

    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired access token.'),
    );
  }
}
