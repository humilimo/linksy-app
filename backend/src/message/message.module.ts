import { Module, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationModule } from 'src/conversation/conversation.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [forwardRef(() => ConversationModule)],
  controllers: [MessageController],
  providers: [MessageService,PrismaService],
  exports: [MessageService,PrismaService], 
})
export class MessageModule {}

