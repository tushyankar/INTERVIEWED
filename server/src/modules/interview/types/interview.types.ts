export interface CreateInterviewRequest {
  role: string;
  difficulty: string;
}

export interface CreateInterviewInput {
  userId: string;
  role: string;
  difficulty: string;
}

export interface DeleteInterviewInput {
  interviewId: string;
  userId: string;
}

export interface StartInterviewInput {
  interviewId: string;
  userId: string;
}

export interface FinishInterviewInput {
  interviewId: string;
  userId: string;
}

export interface InterviewSession {
  interviewId: string;
  currentQuestion: number;
  totalQuestions: number;
  completedQuestions: number;
  status: string;
}
