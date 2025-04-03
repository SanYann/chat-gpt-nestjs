import { ChatModel } from 'openai/resources';
import { CompletionCreateParamsBase } from 'openai/resources/completions';

export interface CreateCompletionRequest {
  model: ChatModel;
  prompt: string;
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  user?: string;
}

export { CompletionCreateParamsBase };
