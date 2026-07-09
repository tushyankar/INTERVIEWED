import type { AIProvider } from './ai.provider.js';

/**
 * ================================================================
 * Mock Provider
 * ================================================================
 *
 * Used for:
 *
 * • Local development
 * • Unit testing
 * • API quota exhaustion
 * • Offline mode
 */

export class MockProvider implements AIProvider {
  async generate(
    prompt: string,
  ): Promise<string> {
    console.log(
      '🧪 MockProvider invoked.',
    );

    return JSON.stringify({
      provider: 'mock',
      success: true,
      prompt,
      response:
        'This is a mock AI response generated locally.',
      timestamp: new Date().toISOString(),
    });
  }
}
