import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { FriendService } from './friend.service';
import { SearchFriendDto } from './dto/search-friend.dto';

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

  @Get('search')
  findFriend(@Param('loggeId') loggedId: string, @Query() searchFriendDto: SearchFriendDto){
    return this.friendService.findFriend(+loggedId, searchFriendDto);
  }

  @Delete('delete')
  remove(@Param('loggedId') loggedId: string,  @Body() username: {username : string}) {
    return this.friendService.remove(+loggedId, username);
  }

  
}
