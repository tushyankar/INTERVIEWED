import type { AIProvider } from '../providers/ai.provider.js';
import { GeminiProvider } from '../providers/gemini.provider.js';

/**
 * ================================================================
 * AI Service
 * ================================================================
 *
 * This service acts as the single entry point for all AI requests.
 * The rest of the application should NEVER instantiate providers
 * directly.
 */

class AIService {
  private readonly provider: AIProvider;

  constructor() {
    this.provider = new GeminiProvider();
  }

  async generate(
    prompt: string,
  ): Promise<string> {
    return this.provider.generate(prompt);
  }
}

export const aiService = new AIService();
