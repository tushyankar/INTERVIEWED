import ApiError from '../../../utils/ApiError.js';
import prisma from '../../../lib/prisma.js';

import {
  createResponse,
  findResponseByQuestionId,
  getInterviewResponses,
  updateResponse,
} from '../repositories/response.repository.js';

import {
  findQuestionById,
} from '../../interview/repositories/interview.repository.js';

import { evaluationAIService } from '../../ai/services/evaluation-ai.service.js';

import type {
  SubmitResponseInput,
} from '../types/response.types.js';

/**
 * ================================================================
 * Submit Response
 * ================================================================
 */

export async function submitResponseService(
  data: SubmitResponseInput,
) {
  const question =
    await findQuestionById(
      data.questionId,
    );

  if (!question) {
    throw new ApiError(
      404,
      'Question not found.',
    );
  }

  let response =
    await findResponseByQuestionId(
      data.questionId,
    );

  if (response) {
    response =
      await updateResponse(
        response.id,
        data.transcript,
      );
  } else {
    response =
      await createResponse({
        questionId: data.questionId,
        transcript: data.transcript,
      });
  }

  /**
   * AI Evaluation
   */

  const evaluation =
    await evaluationAIService.evaluateAnswer(
      question.questionText,
      data.transcript,
    );

  const updatedResponse =
    await prisma.response.update({
      where: {
        id: response.id,
      },
      data: {
        score: evaluation.score,
        aiFeedback: evaluation,
      },
    });

  return updatedResponse;
}

/**
 * ================================================================
 * Interview Responses
 * ================================================================
 */

export async function getInterviewResponsesService(
  interviewId: string,
) {
  return getInterviewResponses(
    interviewId,
  );
}