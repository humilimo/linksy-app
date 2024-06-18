import { Module } from '@nestjs/common';
import { ErasedMessageService } from './erased-message.service';
import { ErasedMessageController } from './erased-message.controller';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { UserConversationService } from 'src/user-conversation/user-conversation.service';

 

@Module({
  controllers: [ErasedMessageController],
  providers: [ErasedMessageService,PrismaService, MessageService, ConversationService,UserConversationService],
})
export class ErasedMessageModule {}
