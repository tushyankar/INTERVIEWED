import { GoogleGenAI } from '@google/genai';

import type { AIProvider } from './ai.provider.js';

export class GeminiProvider implements AIProvider {
  private readonly client: GoogleGenAI;

  private readonly model = 'gemini-2.5-flash';

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is not configured.',
      );
    }

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async generate(
    prompt: string,
  ): Promise<string> {
    try {
      console.log(
        '🤖 Sending request to Gemini...',
      );

      const response =
        await this.client.models.generateContent({
          model: this.model,
          contents: prompt,
        });

      const text = response.text;

      if (!text) {
        throw new Error(
          'Gemini returned an empty response.',
        );
      }

      console.log(
        '✅ Gemini response received.',
      );

      return text.trim();
    } catch (error) {
      console.error(
        '❌ Gemini Provider Error:',
        error,
      );

      throw error;
    }
  }
}
