export type ResumeStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface ResumeCandidate {
  name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
}

export interface ResumeSkills {
  languages: string[];
  frameworks: string[];
  libraries: string[];
  databases: string[];
  tools: string[];
  cloud: string[];
  devops: string[];
}

export interface ResumeExperience {
  company: string;
  role: string;
  duration: string;
  location?: string | null;
  description: string[];
}

export interface ResumeProject {
  name: string;
  technologies: string[];
  description: string;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  duration: string;
  cgpa?: string | null;
}

export interface ResumeAnalysis {
  candidate: ResumeCandidate;

  summary: string;

  careerLevel:
    | 'Student'
    | 'Fresher'
    | 'Junior'
    | 'Mid'
    | 'Senior';

  skills: ResumeSkills;

  experience: ResumeExperience[];

  projects: ResumeProject[];

  education: ResumeEducation[];

  certifications: string[];

  strengths: string[];

  recommendedRoles: string[];
}

export interface Resume {
  id: string;

  originalName: string;

  filename: string;

  filePath: string;

  mimeType: string;

  size: number;

  extractedText: string;

  aiAnalysis: ResumeAnalysis | null;

  isActive: boolean;

  status: ResumeStatus;

  createdAt: string;

  updatedAt: string;
}

export interface UploadResumeResponse {
  success: boolean;
  message: string;
  data: Resume;
}

export interface ResumeListResponse {
  success: boolean;
  data: Resume[];
}
