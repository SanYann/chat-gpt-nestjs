import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Configuration, Model, OpenAIApi } from 'openai';
import { ChatModuleOptions } from './interfaces/chat.module.interface';
import { MODULE_OPTIONS_TOKEN } from './chat.module.definition';
import { CreateChatCompletionRequest } from './interfaces/create-chat-completion.interface';
import { CreateCompletionRequest } from './interfaces/create-completion.interface';
import { CHAT_COMPLETION_MODEL } from './enum/model.enum';

@Injectable()
export class ChatService {
  public openai: OpenAIApi;
  private apiKey: string;
  private organization: string;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(MODULE_OPTIONS_TOKEN) options: ChatModuleOptions,
  ) {
    this.apiKey = options.apiKey;
    this.organization = options.organizationId;
    const configuration = new Configuration({
      organization: options.organizationId,
      apiKey: options.apiKey,
    });

    this.openai = new OpenAIApi(configuration);
  }

  private async getCachedModels() {
    return this.cacheManager.get<Model[]>('models');
  }

  async listModels() {
    try {
      const models = await this.getCachedModels();
      if (models) return models;
      const requests = await this.openai.listModels();
      await this.cacheManager.set('models', requests.data.data, 0);
      return requests.data.data;
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

  async createChatCompletion(
    createChatCompletionRequest: CreateChatCompletionRequest,
  ) {
    try {
      const models = await this.listModels();
      const completion = await this.openai.createChatCompletion({
        model:
          createChatCompletionRequest?.model ??
          models.find((m) => m.id === CHAT_COMPLETION_MODEL.GPT_4)
            ? CHAT_COMPLETION_MODEL.GPT_4
            : CHAT_COMPLETION_MODEL.GPT_3_5_TURBO,
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
      return completion.data;
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
      const completion = await this.openai.createCompletion(
        createCompletionRequest,
      );
      return completion.data.choices[0].text;
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
