export function buildEvaluationPrompt(
  question: string,
  answer: string,
) {
  return `
You are a Senior Software Engineering Interviewer.

Your job is to evaluate the candidate's answer.

QUESTION:
${question}

ANSWER:
${answer}

Evaluate the answer objectively.

Return ONLY valid JSON.

{
  "score": 0,
  "technicalAccuracy": "",
  "communication": "",
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "feedback": ""
}

Rules:

- score must be between 0 and 100
- Be strict
- Do not invent technologies
- Do not use markdown
- Do not wrap JSON inside code blocks
- Output ONLY JSON
`;
}
