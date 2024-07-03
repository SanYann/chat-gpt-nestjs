import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './chat.module.definition';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule extends ConfigurableModuleClass {}
