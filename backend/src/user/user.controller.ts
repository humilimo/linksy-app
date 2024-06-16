import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':loggedId/profile')
  findOne(@Param('loggedId') loggedId: string) {
    return this.userService.findOne(+loggedId);
  }

  @Get(':loggedId/profile/:id')
  findFriend(@Param('loggedId') loggedId: string, @Param('loggedId') id: string) {
    return this.userService.findFriend(+loggedId, +id);
  }

  @Patch(':loggedId/profile')
  update(@Param('loggedId') loggedId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+loggedId, updateUserDto);
  }

  @Delete(':loggedId/profile')
  remove(@Param('loggedId') loggedId: string) {
    return this.userService.remove(+loggedId);
  }
}
