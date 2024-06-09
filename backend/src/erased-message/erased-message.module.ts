import { Module } from '@nestjs/common';
import { ErasedMessageService } from './erased-message.service';
import { ErasedMessageController } from './erased-message.controller';

@Module({
  controllers: [ErasedMessageController],
  providers: [ErasedMessageService],
})
export class ErasedMessageModule {}
