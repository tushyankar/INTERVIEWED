import type { NextFunction, Request, Response } from 'express';

import ApiError from '../utils/ApiError.js';
import { verifyAccessToken } from '../modules/auth/utils/jwt.js';

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ApiError(401, 'Authorization header is missing.');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new ApiError(401, 'Invalid authorization header.');
    }

    const token = authorization.split(' ')[1];

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired access token.'),
    );
  }
}