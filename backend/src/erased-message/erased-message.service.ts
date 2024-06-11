import { Injectable } from '@nestjs/common';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';
import { PrismaService } from '../prisma.service';
import { ErasedMessage } from 'src/erased-message/entities/erased-message.entity';

@Injectable()
export class ErasedMessageService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findMessageFromConversation(erased: ErasedMessage) {
    return await this.prisma.message.findUnique({
      where: {
        userId_chatId_messageId: {
          userId: erased.userId,
          chatId: erased.chatId,
          messageId: erased.messageId,
        },
      },
    });
  }

  async removeErasedMessage(msg: ErasedMessage) {
    const erased = await this.findMessageFromConversation(msg);
    if (!erased) {
      throw new Error('Message not found');
    }

    return this.prisma.message.delete({
      where: {
        id: erased.id,
      },
    });
  }
}
