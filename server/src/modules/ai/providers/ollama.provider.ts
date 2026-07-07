import type { AIProvider } from './ai.provider.js';
import axios from 'axios';

import type { AIProvider } from './ai.provider.js';

interface OllamaResponse {
  message: {
    role: string;
    content: string;
  };
}

export class OllamaProvider implements AIProvider {
  private readonly baseUrl = 'http://127.0.0.1:11434';

  private readonly model = 'qwen3:8b';

  async generate(prompt: string): Promise<string> {
    console.log('🤖 Sending request to Ollama...');

    const response = await axios.post<OllamaResponse>(
      `${this.baseUrl}/api/chat`,
      {
        model: this.model,
        stream: false,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        timeout: 10 * 60 * 1000, // 10 minutes
      },
    );

    console.log('✅ Ollama responded.');

    return response.data.message.content.trim();
  }
}
