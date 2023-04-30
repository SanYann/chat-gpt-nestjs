import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ChatModuleOptions } from './interfaces/chat.module.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ChatModuleOptions>().build();
