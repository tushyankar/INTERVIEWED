import { aiService } from './ai.service.js';

import { buildResumePrompt } from '../prompts/resume.prompt.js';

import {
  ResumeSchema,
  type ResumeAnalysis,
} from '../schemas/resume.schema.js';

import { parseAIResponse } from '../parsers/json.parser.js';

/**
 * ================================================================
 * Resume AI Service
 * ================================================================
 *
 * Converts extracted resume text into a structured
 * Resume Intelligence object.
 */

class ResumeAIService {
  async analyzeResume(
    extractedText: string,
  ): Promise<ResumeAnalysis> {
    const prompt = buildResumePrompt(
      extractedText,
    );

    const response =
      await aiService.generate(prompt);

    return parseAIResponse(
      response,
      ResumeSchema,
    );
  }
}

export const resumeAIService =
  new ResumeAIService();
