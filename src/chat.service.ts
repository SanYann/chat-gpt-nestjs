import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { MODULE_OPTIONS_TOKEN } from './chat.module.definition';
import { ChatModuleOptions } from './interfaces/chat.module.interface';
import { CreateChatCompletionRequest } from './interfaces/create-chat-completion.interface';
import { Model } from 'openai/resources/models';
import { ResponseCreateParamsNonStreaming } from 'openai/resources/responses/responses';
import { CompletionCreateParamsBase } from 'openai/resources/completions';

@Injectable()
export class ChatService {
  public openai: OpenAI;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: ChatModuleOptions) {
    this.openai = new OpenAI({
      organization: options?.organizationId,
      apiKey: options?.apiKey,
    });
  }

  async createChatCompletion(
    createChatCompletionRequest: CreateChatCompletionRequest,
    params?: ChatModuleOptions,
  ) {
    try {
      const openai = this.openai.apiKey ? this.openai : new OpenAI(params);
      const completion = await openai.chat.completions.create({
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

  async createCompletion(
    createCompletionRequest: CompletionCreateParamsBase,
    params?: ChatModuleOptions,
  ) {
    try {
      const openai = this.openai.apiKey ? this.openai : new OpenAI(params);
      const completion = await openai.completions.create(
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

  async createResponse(
    createCompletionRequest: ResponseCreateParamsNonStreaming,
    params?: ChatModuleOptions,
  ) {
    try {
      const openai = this.openai.apiKey ? this.openai : new OpenAI(params);
      const completion = await openai.responses.create(createCompletionRequest);
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

  async getModels(params?: ChatModuleOptions) {
    try {
      const openai = this.openai.apiKey ? this.openai : new OpenAI(params);
      const list = await openai.models.list();
      const models: Model[] = [];
      for await (const model of list) {
        models.push(model);
      }
      return models;
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
