import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma.service';
import { UserConversation } from 'src/user-conversation/entities/user-conversation.entity';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(createMessageDto: CreateMessageDto, senderId: number,conversationId: number) {
    return this.prisma.message.create({
      data: {
        senderId: senderId,
        conversationId: conversationId,
        content: createMessageDto.content
      }
    });
  }

  async findAllMessagesFromConversation(loggedId: number, conversationId: number) {
    var messages = await this.prisma.message.findMany(
      {
        where: {
          conversationId: conversationId
        },
        include: {
          userConversation: {
            include: {
              user: true
              }
            }
          }
        },
    );
    var messagesAndSenderInfo = messages.map(message => {
      const {
        userConversation, 
        ...restMessage
      } = message;
      return {
        message: restMessage,
        senderInfo: {
          name: userConversation.user.name,
          userPicture: userConversation.user.picture
        },
      }
    });

    return messagesAndSenderInfo;
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
