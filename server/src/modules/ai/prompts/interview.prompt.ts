/**
 * ================================================================
 * Interview Generation Prompt
 * ================================================================
 *
 * Generates structured interview questions based on the
 * candidate profile.
 */

export function buildInterviewPrompt(
  profile: unknown,
  role: string,
  difficulty: string,
): string {
  return `
You are a Senior Software Engineering Interviewer.

Generate exactly 10 interview questions.

Candidate Profile:

${JSON.stringify(profile, null, 2)}

Target Role:

${role}

Difficulty:

${difficulty}

Rules:

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT explain anything.
- Do NOT include extra text.
- Questions must be specific to the candidate's skills.
- Cover multiple topics.
- Questions should progressively increase in difficulty.

Return this JSON:

{
  "questions":[
    {
      "question":"...",
      "topic":"...",
      "difficulty":"..."
    }
  ]
}
`;
}
