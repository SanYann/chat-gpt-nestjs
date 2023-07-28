import { CHAT_COMPLETION_MODEL } from '../enum/model.enum';

export interface CreateCompletionRequest {
  model: CHAT_COMPLETION_MODEL;
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
