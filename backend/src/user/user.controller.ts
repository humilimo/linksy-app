import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    try{
      return this.userService.create(createUserDto);
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
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
