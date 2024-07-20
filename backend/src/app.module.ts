import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { UserConversationModule } from './user-conversation/user-conversation.module';
import { ErasedMessageModule } from './erased-message/erased-message.module';
import { FriendModule } from './friend/friend.module'
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UserModule,
    forwardRef(() => MessageModule), 
    forwardRef(() => ConversationModule), 
    UserConversationModule,
    ErasedMessageModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AppModule {}
