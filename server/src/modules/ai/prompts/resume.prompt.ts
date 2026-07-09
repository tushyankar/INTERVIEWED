/**
 * ============================================================
 * Resume Analysis Prompt
 * ============================================================
 *
 * This prompt converts an extracted resume into a structured
 * JSON object. The AI MUST respond with valid JSON only.
 */

export function buildResumePrompt(
  resumeText: string,
): string {
  return `
You are an expert technical recruiter and resume parser.

Analyse the following resume.

Return ONLY valid JSON.

Do NOT include markdown.

Do NOT include explanations.

Use this exact schema.

{
  "candidate": {
    "name": "",
    "email": "",
    "phone": "",
    "location": ""
  },

  "summary": "",

  "careerLevel": "",

  "skills": {
    "languages": [],
    "frameworks": [],
    "libraries": [],
    "databases": [],
    "tools": [],
    "cloud": [],
    "devops": []
  },

  "experience": [],

  "projects": [],

  "education": [],

  "certifications": [],

  "strengths": [],

  "recommendedRoles": []
}

Career level must be one of:

- Student
- Fresher
- Junior
- Mid
- Senior

Resume:

${resumeText}
`;
}
