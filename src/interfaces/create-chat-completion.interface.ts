import { ChatCompletionMessageParam } from 'openai/resources';

export interface CreateChatCompletionRequest {
  model: string;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  top_p?: number;
  n?: number;
  max_tokens?: number;
  user?: string;
}
