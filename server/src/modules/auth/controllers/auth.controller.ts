import { Request, Response, NextFunction } from 'express';

import * as authService from '../services/auth.service.js';
import { signupSchema } from '../validators/auth.validator.js';

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