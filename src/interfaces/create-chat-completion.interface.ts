import { ChatCompletionRequestMessageRoleEnum } from 'openai';

export interface CreateChatCompletionMessages {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
  name?: string;
}

export interface CreateChatCompletionRequest {
  model?: string;
  messages: CreateChatCompletionMessages[];
  temperature?: number;
  top_p?: number;
  n?: number;
  max_tokens?: number;
  user?: string;
}
