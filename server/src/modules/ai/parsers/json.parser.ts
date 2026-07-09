import { ZodSchema } from 'zod';

/**
 * ================================================================
 * JSON Parser
 * ================================================================
 *
 * Safely extracts JSON from Gemini responses and validates it
 * against a supplied Zod schema.
 */

export function parseAIResponse<T>(
  response: string,
  schema: ZodSchema<T>,
): T {
  try {
    let cleaned = response.trim();

    /**
     * Remove Markdown code fences if present.
     */
    cleaned = cleaned.replace(
      /^```(?:json)?/i,
      '',
    );

    cleaned = cleaned.replace(
      /```$/i,
      '',
    );

    /**
     * Locate the JSON object.
     */
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');

    if (start === -1 || end === -1) {
      throw new Error(
        'No JSON object found in AI response.',
      );
    }

    cleaned = cleaned.substring(
      start,
      end + 1,
    );

    const parsed = JSON.parse(cleaned);

    return schema.parse(parsed);
  } catch (error) {
    console.error(
      '❌ Failed to parse AI response.',
      error,
    );

    throw new Error(
      'Invalid AI response received.',
    );
  }
}
