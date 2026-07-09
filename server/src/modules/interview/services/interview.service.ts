import ApiError from '../../../utils/ApiError.js';

import {
  createInterview,
  findInterviewById,
  findUserInterviews,
  removeInterview,
} from '../repositories/interview.repository.js';

import {
  findLatestResumeByUserId,
} from '../../resume/repositories/resume.repository.js';

import { interviewAIService } from '../../ai/services/interview-ai.service.js';

import type {
  CreateInterviewInput,
  DeleteInterviewInput,
} from '../types/interview.types.js';

/**
 * ================================================================
 * Create Interview Service
 * ================================================================
 */
export async function createInterviewService(
  data: CreateInterviewInput,
) {
  /**
   * Fetch the user's latest analyzed resume.
   */
  const resume = await findLatestResumeByUserId(
    data.userId,
  );

  if (!resume) {
    throw new ApiError(
      404,
      'Resume not found.',
    );
  }

  if (!resume.aiAnalysis) {
    throw new ApiError(
      400,
      'Resume has not been analyzed yet.',
    );
  }

  /**
   * Generate interview questions using Gemini.
   */
  const interviewQuestions =
    await interviewAIService.generateInterview(
      resume.aiAnalysis,
      data.role,
      data.difficulty,
    );

  /**
   * Create interview and persist all generated questions.
   */
  const interview = await createInterview(
    data,
    interviewQuestions.questions,
  );

  return interview;
}

/**
 * ================================================================
 * Get Interview
 * ================================================================
 */
export async function getInterviewService(
  interviewId: string,
  userId: string,
) {
  const interview = await findInterviewById(
    interviewId,
  );

  if (!interview) {
    throw new ApiError(
      404,
      'Interview not found.',
    );
  }

  if (interview.userId !== userId) {
    throw new ApiError(
      403,
      'Unauthorized.',
    );
  }

  return interview;
}

/**
 * ================================================================
 * Get User Interviews
 * ================================================================
 */
export async function getUserInterviewsService(
  userId: string,
) {
  return findUserInterviews(userId);
}

/**
 * ================================================================
 * Delete Interview
 * ================================================================
 */
export async function deleteInterviewService(
  data: DeleteInterviewInput,
) {
  return removeInterview(data);
}