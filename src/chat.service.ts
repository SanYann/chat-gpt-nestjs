import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { MODULE_OPTIONS_TOKEN } from './chat.module.definition';
import { ChatModuleOptions } from './interfaces/chat.module.interface';
import { CreateChatCompletionRequest } from './interfaces/create-chat-completion.interface';
import { CreateCompletionRequest } from './interfaces/create-completion.interface';

@Injectable()
export class ChatService {
  public openai: OpenAI;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: ChatModuleOptions) {
    this.openai = new OpenAI({
      organization: options.organizationId,
      apiKey: options.apiKey,
    });
  }

  async createChatCompletion(
    createChatCompletionRequest: CreateChatCompletionRequest,
  ) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: createChatCompletionRequest.model,
        messages: createChatCompletionRequest.messages,
        ...(createChatCompletionRequest.temperature && {
          temperature: createChatCompletionRequest.temperature,
        }),
        ...(createChatCompletionRequest.top_p && {
          top_p: createChatCompletionRequest.top_p,
        }),
        ...(createChatCompletionRequest.max_tokens && {
          max_tokens: createChatCompletionRequest.max_tokens,
        }),
      });
      return completion.choices?.[0];
    } catch (error) {
      if (error.response) {
        throw new Error(
          `[${error.response.status}]: ${JSON.stringify(error.response.data)}`,
        );
      } else {
        throw new Error(error.message);
      }
    }
  }

  async createCompletion(createCompletionRequest: CreateCompletionRequest) {
    try {
      const completion = await this.openai.completions.create(
        createCompletionRequest,
      );
      return completion;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `[${error.response.status}]: ${JSON.stringify(error.response.data)}`,
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
}
