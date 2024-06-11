import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('user/:loggedId/conversation')

export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Param('loggedId') loggedId: string, @Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(+loggedId, createConversationDto);
  }

  @Get()
  findAll(@Param('loggedId') loggedId: string) {
    return this.conversationService.findAll(+loggedId);
  }

  @Get(':id')
  findOne(@Param('loggedId') loggedId: string, @Param('id') id: string) {
    return this.conversationService.findOne(+loggedId, +id);
  }

  @Get(':id/perfil')
  findConversationInfo(@Param('loggedId') loggedId: string, @Param('id') conversationId: string){
    return this.conversationService.findConversationInfo(+loggedId, +conversationId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id/apagar')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }

  @Delete(':id/apagar_tudo')
    removeAll(@Param('loggedId') loggedId: string, @Param('id') conversationId: string) {
    return this.conversationService.removeAll(+loggedId, +conversationId);
  }
}
