import { ChatCompletionMessageParam, ChatModel } from 'openai/resources';

export interface CreateChatCompletionRequest {
  model: ChatModel;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  top_p?: number;
  n?: number;
  max_tokens?: number;
  user?: string;
}
