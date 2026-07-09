import { aiService } from './ai.service.js';

import { buildEvaluationPrompt } from '../prompts/evaluation.prompt.js';

import {
  EvaluationSchema,
  type EvaluationResult,
} from '../schemas/evaluation.schema.js';

import { parseAIResponse } from '../parsers/json.parser.js';

/**
 * ================================================================
 * Evaluation AI Service
 * ================================================================
 *
 * Evaluates a candidate's interview answer using Gemini.
 */

class EvaluationAIService {
  async evaluateAnswer(
    question: string,
    answer: string,
  ): Promise<EvaluationResult> {
    const prompt = buildEvaluationPrompt(
      question,
      answer,
    );

    console.log(
      '🤖 Sending answer to Gemini for evaluation...',
    );

    const response =
      await aiService.generate(prompt);

    console.log(
      '✅ Gemini evaluation received.',
    );

    return parseAIResponse(
      response,
      EvaluationSchema,
    );
  }
}

export const evaluationAIService =
  new EvaluationAIService();

