import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConfigurableModuleClass } from './chat.module.definition';

@Module({
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule extends ConfigurableModuleClass {}
