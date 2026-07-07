import { OllamaProvider } from '../providers/ollama.provider.js';
import { buildResumePrompt } from '../prompts/resume.prompt.js';
import {
  ResumeAIResult,
  ResumeSchema,
} from '../validators/resume.validator.js';

export class ResumeAIService {
  private readonly provider = new OllamaProvider();

  async analyzeResume(
    extractedText: string,
  ): Promise<ResumeAIResult> {
    const prompt = buildResumePrompt(extractedText);

    const response = await this.provider.generate(prompt);

    let parsed: unknown;

    try {
      parsed = JSON.parse(response);
    } catch {
      throw new Error(
        'Ollama returned an invalid JSON response.',
      );
    }

    return ResumeSchema.parse(parsed);
  }
}

export const resumeAIService = new ResumeAIService();
