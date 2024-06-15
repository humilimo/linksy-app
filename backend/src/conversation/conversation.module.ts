import { Module, forwardRef } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from '../prisma.service';
import { MessageModule } from 'src/message/message.module'; 
import { UserConversationService } from 'src/user-conversation/user-conversation.service';

@Module({
  imports: [forwardRef(() => MessageModule)], 
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService, UserConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
