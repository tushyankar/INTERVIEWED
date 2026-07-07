export function buildResumePrompt(resumeText: string): string {
  return `
You are an expert technical recruiter and resume parser.

Your task is to analyze the resume below and extract structured information.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not wrap the JSON inside \`\`\`.

The JSON MUST match this schema exactly:

{
  "summary": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "year": "string"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string"]
    }
  ],
  "certifications": ["string"]
}

Resume:

${resumeText}
`;
}
