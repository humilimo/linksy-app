import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('user/:loggedId/friend')

export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('add')
  create(@Param('loggedId') loggedId: string, @Body() username: {username : string}) {
    return this.friendService.create(+loggedId, username);
  }

  @Get('all')
  findAll(@Param('loggedId') loggedId: string) {
    return this.friendService.findAll(+loggedId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
  //   return this.friendService.update(+id, updateFriendDto);
  // }

  @Delete('delete')
  remove(@Param('loggedId') loggedId: string,  @Body() username: {username : string}) {
    return this.friendService.remove(+loggedId, username);
  }
}
