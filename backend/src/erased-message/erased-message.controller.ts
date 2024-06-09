import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ErasedMessageService } from './erased-message.service';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';

@Controller('erased-message')
export class ErasedMessageController {
  constructor(private readonly erasedMessageService: ErasedMessageService) {}

  @Post()
  create(@Body() createErasedMessageDto: CreateErasedMessageDto) {
    return this.erasedMessageService.create(createErasedMessageDto);
  }

  @Get()
  findAll() {
    return this.erasedMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.erasedMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateErasedMessageDto: UpdateErasedMessageDto) {
    return this.erasedMessageService.update(+id, updateErasedMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.erasedMessageService.remove(+id);
  }
}
