import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatService } from './chat.service';
import { ConfigurableModuleClass } from './chat.module.definition';

@Module({
  imports: [CacheModule.register()],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule extends ConfigurableModuleClass {}
