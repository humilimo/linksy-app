import { Injectable } from '@nestjs/common';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';

@Injectable()
export class ErasedMessageService {
  create(createErasedMessageDto: CreateErasedMessageDto) {
    return 'This action adds a new erasedMessage';
  }

  findAll() {
    return `This action returns all erasedMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} erasedMessage`;
  }

  update(id: number, updateErasedMessageDto: UpdateErasedMessageDto) {
    return `This action updates a #${id} erasedMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} erasedMessage`;
  }
}
