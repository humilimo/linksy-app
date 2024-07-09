import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { SearchMessageDto } from 'src/message/dto/search-message.dto';

@Controller('user/:loggedId/conversation')

export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  createConversation(@Param('loggedId') loggedId: string, @Body() createConversationDto: CreateConversationDto) {
    if (createConversationDto.isGroup)
      return this.conversationService.createGroupConversation(+loggedId, createConversationDto);
    else
      return this.conversationService.createSimpleConversation(+loggedId, createConversationDto);
  }

  @Get()
  getRecentConversations(@Param('loggedId') loggedId: string) {
    return this.conversationService.getRecentConversations(+loggedId);
  }

  @Get(':id')
  findOne(@Param('loggedId') loggedId: string, @Param('id') id: string) {
    return this.conversationService.findOne(+loggedId, +id);
  }

  @Get(':id/profile')
  getConversationInfo(@Param('loggedId') loggedId: string, @Param('id') conversationId: string){
    return this.conversationService.getConversationInfo(+loggedId, +conversationId)
  }

  @Patch(':id')
  updateGroupName(@Param('loggedId') loggedId: string, @Param('id') id: string, @Body() name: {name: string}) {
    return this.conversationService.updateGroupName(+loggedId, +id, name);
  }


  @Delete(':id/delete_all')
    removeAll(@Param('loggedId') loggedId: string, @Param('id') conversationId: string, @Body() request: {groupName: string}) {
    return this.conversationService.removeAll(+loggedId, +conversationId, request.groupName);
  }
}
