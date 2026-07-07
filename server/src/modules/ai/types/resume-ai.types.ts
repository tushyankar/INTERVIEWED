export interface ResumeSummary {
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
  certifications: string[];
}

export interface ResumeExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  year: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  technologies: string[];
}
