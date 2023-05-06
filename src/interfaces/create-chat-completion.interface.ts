export interface CreateChatCompletionRequest {
  content: string;
  temperature?: number;
  top_p?: number;
}
