/**
 * ================================================================
 * AI Provider Interface
 * ================================================================
 *
 * Every AI provider (Gemini, Mock, OpenAI, etc.)
 * must implement this interface.
 */

export interface AIProvider {
  /**
   * Generates a response from the AI model.
   *
   * @param prompt Prompt sent to the AI model.
   * @returns AI-generated response.
   */
  generate(
    prompt: string,
  ): Promise<string>;
}
