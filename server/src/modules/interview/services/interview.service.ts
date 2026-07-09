import { InterviewStatus } from '@prisma/client';

import ApiError from '../../../utils/ApiError.js';

import {
  createInterview,
  findInterviewById,
  findUserInterviews,
  removeInterview,
  startInterview,
  completeInterview,
} from '../repositories/interview.repository.js';

import {
  findLatestResumeByUserId,
} from '../../resume/repositories/resume.repository.js';

import { interviewAIService } from '../../ai/services/interview-ai.service.js';

import { updateAnalytics } from '../../analytics/services/analytics.service.js';

import type {
  CreateInterviewInput,
  DeleteInterviewInput,
} from '../types/interview.types.js';

/**
 * ================================================================
 * Create Interview
 * ================================================================
 */

export async function createInterviewService(
  data: CreateInterviewInput,
) {
  const resume =
    await findLatestResumeByUserId(
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

  const interviewQuestions =
    await interviewAIService.generateInterview(
      resume.aiAnalysis,
      data.role,
      data.difficulty,
    );

  return createInterview(
    data,
    interviewQuestions.questions,
  );
}

/**
 * ================================================================
 * Start Interview
 * ================================================================
 */

export async function startInterviewService(
  interviewId: string,
  userId: string,
) {
  const interview =
    await findInterviewById(
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

  if (
    interview.status ===
    InterviewStatus.COMPLETED
  ) {
    throw new ApiError(
      400,
      'Interview already completed.',
    );
  }

  return startInterview(
    interviewId,
  );
}

/**
 * ================================================================
 * Finish Interview
 * ================================================================
 */

export async function finishInterviewService(
  interviewId: string,
  userId: string,
) {
  const interview =
    await findInterviewById(
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

  if (
    interview.status ===
    InterviewStatus.COMPLETED
  ) {
    throw new ApiError(
      400,
      'Interview already completed.',
    );
  }

  const completedInterview =
    await completeInterview(
      interviewId,
    );

  /**
   * ================================================================
   * Update analytics ONLY after interview completion
   * ================================================================
   */

  await updateAnalytics(
    userId,
  );

  return completedInterview;
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
  const interview =
    await findInterviewById(
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
 * User Interviews
 * ================================================================
 */

export async function getUserInterviewsService(
  userId: string,
) {
  return findUserInterviews(
    userId,
  );
}

/**
 * ================================================================
 * Delete Interview
 * ================================================================
 */

export async function deleteInterviewService(
  data: DeleteInterviewInput,
) {
  return removeInterview(
    data,
  );
}