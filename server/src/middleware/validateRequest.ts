import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

import ApiError from '../utils/ApiError.js';

/**
 * ================================================================
 * Request Validation Middleware
 * ================================================================
 *
 * Validates req.body using the supplied Zod schema.
 */

export function validateRequest<T>(schema: ZodSchema<T>) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch {
      next(
        new ApiError(
          400,
          'Request validation failed.',
        ),
      );
    }
  };
}