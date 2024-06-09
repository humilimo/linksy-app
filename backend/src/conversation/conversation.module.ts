import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from '../prisma.service';
import { UserConversationService } from '../user-conversation/user-conversation.service';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService, UserConversationService],
})
export class ConversationModule {}
