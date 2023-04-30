import { Inject, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ChatModuleOptions } from './interfaces/chat.module.interface';
import { MODULE_OPTIONS_TOKEN } from './chat.module.definition';

@Injectable()
export class ChatService {
  private openai: OpenAIApi;
  private apiKey: string;
  private organization: string;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ChatModuleOptions,
  ) {
    this.apiKey = options.apiKey;
    this.organization = options.organizationId;
    const configuration = new Configuration({
      organization: options.organizationId,
      apiKey: options.apiKey,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async chatCompletion() {
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: 'Hello world',
      });
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
