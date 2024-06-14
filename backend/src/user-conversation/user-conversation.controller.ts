import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserConversationService } from './user-conversation.service';
import { CreateUserConversationDto } from './dto/create-user-conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user-conversation.dto';

@Controller('user/:loggedId/conversation/:conversationId')
export class UserConversationController {
  constructor(private readonly userConversationService: UserConversationService) {}

  @Post()
  create(@Body() createUserConversationDto: CreateUserConversationDto) {
    return this.userConversationService.create(createUserConversationDto);
  }

  @Post('adicionar')
  addUsers(@Param('loggedId') loggedId: string, @Param('conversationId') conversationId: string, @Body() ids: {ids: number[]}) {
    return this.userConversationService.addUsers(+loggedId, +conversationId, ids);
  }
  
  @Get()
  findAll() {
    return this.userConversationService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userConversationService.findOne(+id);
  // }

  @Patch()
  update(@Param('loggedId') loggedId: string, @Param('conversationId') conversationId: string, @Body() updateUserConversationDto: UpdateUserConversationDto) {
    return this.userConversationService.update(+loggedId, +conversationId, updateUserConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userConversationService.remove(+id);
  }
}
