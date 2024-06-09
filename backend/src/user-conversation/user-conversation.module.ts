import { Module } from '@nestjs/common';
import { UserConversationService } from './user-conversation.service';
import { UserConversationController } from './user-conversation.controller';

@Module({
  controllers: [UserConversationController],
  providers: [UserConversationService],
})
export class UserConversationModule {}
