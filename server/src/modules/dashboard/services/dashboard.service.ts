import ApiError from '../../../utils/ApiError.js';

import {
  getDashboardData,
} from '../repositories/dashboard.repository.js';

/**
 * ================================================================
 * Dashboard Service
 * ================================================================
 */

export async function getDashboardService(
  userId: string,
) {
  const dashboard =
    await getDashboardData(
      userId,
    );

  if (!dashboard.user) {
    throw new ApiError(
      404,
      'User not found.',
    );
  }

  return {
    user: dashboard.user,

    analytics:
      dashboard.analytics ?? {
        averageScore: 0,
        interviewsTaken: 0,
        strongestSkill: null,
        weakestSkill: null,
      },

    latestResume:
      dashboard.latestResume,

    recentInterviews:
      dashboard.recentInterviews,
  };
}
