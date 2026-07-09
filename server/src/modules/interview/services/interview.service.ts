import ApiError from '../../../utils/ApiError.js';

import {
  createInterview,
  deleteInterview,
  getInterviewById,
  getUserInterviews,
} from '../repositories/interview.repository.js';

import {
  CreateInterviewInput,
  DeleteInterviewInput,
} from '../types/interview.types.js';

export async function createInterviewService(
  data: CreateInterviewInput,
) {
  const interview = await createInterview(data);

  return interview;
}

export async function getInterviewService(
  interviewId: string,
  userId: string,
) {
  const interview = await getInterviewById(
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
      'You are not authorized to access this interview.',
    );
  }

  return interview;
}

export async function getUserInterviewsService(
  userId: string,
) {
  return getUserInterviews(userId);
}

export async function deleteInterviewService(
  data: DeleteInterviewInput,
) {
  const deleted = await deleteInterview(data);

  if (deleted.count === 0) {
    throw new ApiError(
      404,
      'Interview not found.',
    );
  }

  return {
    success: true,
  };
}

