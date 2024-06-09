import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('user/:loggedId/conversation')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':sendToId')
  create(@Param('loggedId') loggedId: string, @Param('sendToId') sendToId : string, @Body() createMessageDto: CreateMessageDto) {
    return this.messageService.sendMessage(createMessageDto);
  }

  @Patch('editar/:id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete('apagar/:id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
