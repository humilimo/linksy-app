import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from '../prisma.service';
import { MessageService } from 'src/message/message.service';
import { UserConversationService } from 'src/user-conversation/user-conversation.service';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService, MessageService, UserConversationService],
})
export class ConversationModule {}
