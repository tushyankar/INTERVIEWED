import { InterviewStatus } from '@prisma/client';

export interface CreateInterviewInput {
  userId: string;
  role: string;
  difficulty: string;
}

export interface CreateInterviewRequest {
  role: string;
  difficulty: string;
}

export interface InterviewResponse {
  id: string;
  role: string;
  difficulty: string;
  status: InterviewStatus;
  createdAt: Date;
}

export interface InterviewListResponse {
  id: string;
  role: string;
  difficulty: string;
  status: InterviewStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteInterviewInput {
  interviewId: string;
  userId: string;
}
