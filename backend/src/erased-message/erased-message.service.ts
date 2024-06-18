import { Injectable } from '@nestjs/common';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@Injectable()
export class ErasedMessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createErasedMessageDto: CreateErasedMessageDto) {
    return this.prisma.erasedMessages.create({
      data: createErasedMessageDto,
    });
  }

  

  async update(id: number, updateErasedMessageDto: UpdateErasedMessageDto) {
    return this.prisma.erasedMessages.update({
      where: { userId: id },
      data: updateErasedMessageDto,
    });
  }

  async remove(userId: number, chatId: number, messageId: number) {
    return this.prisma.erasedMessages.delete({
      where: { 
        userId: userId,
        chatId: chatId,
        messageId: messageId,

      },
    });
  }

  async findAllMessageFromConversation(userId: number, chatId: number) {//retorna um array de mensagens na conversa na interface user/chat
    const userConversation = await this.prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId: userId,
          conversationId: chatId,
        },
      },
      select: {
        Message: true,
      },
    });

    if (!userConversation) {
      throw new Error('User conversation not found');
    }

    return userConversation.Message;
  }

  async findMessageFromConversation(userId: number, chatId: number, messageId: number) {//retorna a mensagem da conversa na infertace user/chat
    const messageList = await this.findAllMessageFromConversation(userId,chatId);
    if (!messageList) {
      throw new Error('Message Not found');
    }

     
    const message = messageList.find(message => message.id === messageId);
    if (!message) {
      throw new Error('Message not found');
    }
  
    return message;

    
  }


  async removeMessageFromConversationToMe(userId: number, messageId: number, chatId: number) {
    const messageList = await this.findAllMessageFromConversation(userId, chatId);
    if (!messageList) {
      throw new Error('No messages to be deleted');
    }
  
    const userConversation = await this.prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId: userId,
          conversationId: chatId,
        },
      },
      include: {
        Message: true, 
      },
    });
  
    if (!userConversation) {
      throw new Error('No conversation found');
    }
  
    // Remove the message from the message list
    const updatedMessageList = messageList.filter(message => message.id !== messageId);
  
    // Update the user conversation with the new message list
    await this.prisma.userConversation.update({
      where: {
        userId_conversationId: {
          userId: userId,
          conversationId: chatId,
        },
      },
      data: {
        Message: {
          set: updatedMessageList.map(message => ({ id: message.id })),
        },
      },
    });
  
    // Add the message to the erasedMessages table
    await this.prisma.erasedMessages.create({
      data: {
        userId: userId,
        chatId: chatId,
        messageId: messageId,
      },
    });
  }

  async getparticipantsIds(conversationId: number) {
    const conversationInfo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });
  
    if (!conversationInfo) {
      throw new Error('Conversation not found');
    }
  
    
      const userConversations = await this.prisma.userConversation.findMany({
        where: {
          conversationId: conversationId,
          userId: { not: 0 } // assuming 0 is the ghost-user Id
        },
        select: {
          userId: true
        },
      });
  
      const ids = userConversations.map(userConv => userConv.userId);
      return ids;
     
  }

  async removeMessageFromConversationToAll( messageId: number, chatId: number) {
    const ids = await this.getparticipantsIds(chatId);
  
    for (let i = 0; i < ids.length; i++) {
      await this.removeMessageFromConversationToMe(ids[i], messageId, chatId);
    }
  }
  async findAll(){
    return this.prisma.erasedMessages.findMany();
  }
}
