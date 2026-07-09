import { aiService } from './ai.service.js';

import { buildInterviewPrompt } from '../prompts/interview.prompt.js';

import {
  InterviewSchema,
  type InterviewAnalysis,
} from '../schemas/interview.schema.js';

import { parseAIResponse } from '../parsers/json.parser.js';

/**
 * ================================================================
 * Interview AI Service
 * ================================================================
 *
 * Generates interview questions from the candidate profile.
 */

class InterviewAIService {
  async generateInterview(
    profile: unknown,
    role: string,
    difficulty: string,
  ): Promise<InterviewAnalysis> {
    const prompt = buildInterviewPrompt(
      profile,
      role,
      difficulty,
    );

    const response =
      await aiService.generate(prompt);

    return parseAIResponse(
      response,
      InterviewSchema,
    );
  }
}

export const interviewAIService =
  new InterviewAIService();
