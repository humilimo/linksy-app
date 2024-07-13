import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';
import { HttpStatus, HttpException } from '@nestjs/common';
import { ForbiddenException } from './exceptions/forbidden.exception';

@Controller('user/:loggedId/conversation')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':sendToId')
  async create(@Param('loggedId') loggedId: string, @Param('sendToId') sendToId : string, @Body() createMessageDto: CreateMessageDto) {
    try { 
      return await this.messageService.sendMessage(createMessageDto, +loggedId, +sendToId);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get(':id/search')
  searchMessageInUniqueConversation(@Param('loggedId') loggedId: string,@Param('id') conversationId: string,@Query() searchMessageDto: SearchMessageDto) {
    return this.messageService.searchMessageInUniqueConversation(+loggedId,+conversationId,searchMessageDto);
  }

  @Get('search')
  searchMessageInAllConversations(@Param('loggedId') loggedId: string,@Query() searchMessageDto: SearchMessageDto) {
    return this.messageService.searchMessageInAllConversations(+loggedId,searchMessageDto);
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
