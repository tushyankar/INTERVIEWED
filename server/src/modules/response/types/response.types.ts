export interface SubmitResponseRequest {
  transcript: string;
}

export interface SubmitResponseInput {
  questionId: string;
  transcript: string;
}

export interface UpdateResponseInput {
  responseId: string;
  transcript: string;
}

export interface ResponseResult {
  id: string;
  questionId: string;
  transcript: string | null;
  videoUrl: string | null;
  createdAt: Date;
}
