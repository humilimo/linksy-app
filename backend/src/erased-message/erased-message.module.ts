import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ErasedMessageService } from './erased-message.service';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';

@Controller('user/:loggedId/conversation/:conversationId')
export class ErasedMessageController {
  constructor(private readonly erasedMessageService: ErasedMessageService) {}

  @Post('erasedMessages')
  async create(@Body() createErasedMessageDto: CreateErasedMessageDto) {
    return this.erasedMessageService.create(createErasedMessageDto);
  }

  @Get('erasedMessages')
  async findAll() {
    return this.erasedMessageService.findAll();
  }

  

  @Patch('erasedMessages/:id')
  async update(@Param('id') id: string, @Body() updateErasedMessageDto: UpdateErasedMessageDto) {
    return this.erasedMessageService.update(+id, updateErasedMessageDto);
  }

  @Delete('erasedMessages/:userId/:conversationId/:messageId')
  async remove( 
    @Param('userId') userId: number,
  @Param('conversationId') conversationId: number,
  @Param('messageId') messageId: number,) {
    return this.erasedMessageService.remove(userId, conversationId,messageId);
  }

  @Patch('apagarMensagemParaMim/:userId/:conversationId/:messageId')
  async eraseMessageToMe(
    @Param('userId') userId: number,
    @Param('conversationId') conversationId: number,
    @Param('messageId') messageId: number,
  ) {
    return this.erasedMessageService.removeMessageFromConversationToMe(userId, messageId, conversationId);
  }

  @Patch('apagarMensagemParaTodos/:conversationId/:messageId')
  async eraseMessageToAll(
    @Param('conversationId') conversationId: number,
    @Param('messageId') messageId: number,
  ) {
    const userIds = await this.erasedMessageService.getparticipantsIds(conversationId);
    return this.erasedMessageService.removeMessageFromConversationToAll( messageId, conversationId);
  }
}
