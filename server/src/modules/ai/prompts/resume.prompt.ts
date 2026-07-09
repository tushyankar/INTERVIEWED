/**
 * ============================================================
 * Resume Analysis Prompt
 * ============================================================
 *
 * Converts an extracted resume into a structured Resume
 * Intelligence object.
 *
 * IMPORTANT:
 * - Return ONLY valid JSON.
 * - No markdown.
 * - No explanations.
 * - Every field MUST exist.
 */

export function buildResumePrompt(
  resumeText: string,
): string {
  return `
You are an expert software engineering recruiter and resume parser.

Your task is to analyse the following resume and convert it into the exact JSON schema below.

Rules:

- Return ONLY valid JSON.
- Do NOT wrap JSON in markdown.
- Do NOT omit any field.
- If a value is unavailable, use:
  - "" for strings
  - [] for arrays
  - null only where explicitly allowed
- Never invent information.
- Extract as much information as possible.

Career level MUST be exactly one of:

Student
Fresher
Junior
Mid
Senior

Return EXACTLY this schema:

{
  "candidate": {
    "name": "",
    "email": "",
    "phone": "",
    "location": ""
  },

  "summary": "",

  "careerLevel": "Fresher",

  "skills": {
    "languages": [],
    "frameworks": [],
    "libraries": [],
    "databases": [],
    "tools": [],
    "cloud": [],
    "devops": []
  },

  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "location": "",
      "description": [
        ""
      ]
    }
  ],

  "projects": [
    {
      "name": "",
      "technologies": [],
      "description": "",
      "highlights": [
        ""
      ]
    }
  ],

  "education": [
    {
      "institution": "",
      "degree": "",
      "duration": "",
      "cgpa": ""
    }
  ],

  "certifications": [],

  "strengths": [],

  "recommendedRoles": []
}

Resume:

${resumeText}
`;
}
