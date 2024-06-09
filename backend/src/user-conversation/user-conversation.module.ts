import { Module } from '@nestjs/common';
import { UserConversationService } from './user-conversation.service';
import { UserConversationController } from './user-conversation.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UserConversationController],
  providers: [UserConversationService, PrismaService],
})
export class UserConversationModule {}
