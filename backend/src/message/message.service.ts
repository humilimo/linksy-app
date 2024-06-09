import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        senderId: createMessageDto.senderId,
        conversationId: createMessageDto.conversationId,
        content: createMessageDto.content,
      }
    });
  }

  async findAllMessagesFromConversation(loggedId: number, conversationId: number) {
    return this.prisma.message.findMany(
      {
        where: {
          senderId: loggedId,
          conversationId: conversationId
        }
      }
    );
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: {
        content: updateMessageDto.content,
      }
    });
  }

  async remove(id: number) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
