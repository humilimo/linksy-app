import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller(':loggedId/conversation')

export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Param('loggedId') loggedId: number, @Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(loggedId, createConversationDto);
  }

  @Get()
  findAll(@Param('loggedId') loggedId: string) {
    return this.conversationService.findAll(+loggedId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
