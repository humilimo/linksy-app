import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ErasedMessageService } from './erased-message.service';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';

@Controller('user/:loggedId/conversation/:conversationId')
export class ErasedMessageController {
  constructor(private readonly erasedMessageService: ErasedMessageService) {}

  

  @Post('deleteForMe/:messageId')
  async eraseMessageToMe(
    @Param('loggedId') loggedId: string,
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.erasedMessageService.removeMessageFromConversationToMe(+loggedId,+messageId, +conversationId);
  }

  @Delete('deleteForAll/:messageId')
  async eraseMessageToAll(
    @Param('conversationId') conversationId: string,
    @Param('messageId') messageId: string,
  ) {
    //const userIds = await this.erasedMessageService.getparticipantsIds(+conversationId);
    return this.erasedMessageService.removeMessageFromConversationToAll( +messageId, +conversationId);
  }

  @Get('getErasedMessages')
  getErasedMessages(
    @Param('erasedById') erasedById: number,
     @Param('conversationId') conversationId: number
    )
     {
    return this.erasedMessageService.getErasedMessages(+erasedById, +conversationId);
  }
}
