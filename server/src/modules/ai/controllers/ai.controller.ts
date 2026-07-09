import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';
import { aiService } from '../services/ai.service.js';

export const testGemini = asyncHandler(
  async (_req: Request, res: Response) => {
    const response = await aiService.generate(
      `
You are a backend AI.

Reply with ONLY this JSON:

{
  "status":"ok",
  "message":"Gemini is working."
}
      `,
    );

    return res.status(200).json({
      success: true,
      provider: 'Gemini',
      response,
    });
  },
);
