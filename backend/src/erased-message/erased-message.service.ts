import { Injectable } from '@nestjs/common';
import { CreateErasedMessageDto } from './dto/create-erased-message.dto';
import { UpdateErasedMessageDto } from './dto/update-erased-message.dto';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';
import { ConversationService } from 'src/conversation/conversation.service';

@Injectable()
export class ErasedMessageService {
  constructor(private readonly prisma: PrismaService, 
    private messageService: MessageService,
    private conversationService: ConversationService,
    
  ) {}

  async create(userId: number, chatId: number, messageId: number) {
    //return {userId, chatId, messageId};
    return this.prisma.erasedMessages.create({
      data: {  
        
         erasedById: userId,
         conversationId: chatId,
         messageId: messageId,
        
      },
      
    });
  }

  

  async update(id: number, updateErasedMessageDto: UpdateErasedMessageDto) {
    return this.prisma.erasedMessages.update({
      where: {  
        erasedById_conversationId_messageId:{
         erasedById: updateErasedMessageDto.userId,
         conversationId: updateErasedMessageDto.chatId,
         messageId: updateErasedMessageDto.messageId,
        }
      },
      data: updateErasedMessageDto,
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
  
  
    // Add the message to the erasedMessages table
    return await this.create(userId, chatId,messageId);
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
    // //return {chatId, messageId};
    //  let ids = await this.getparticipantsIds(chatId);
   
    // // Add the message to the erasedMessages table
    // for(let i = 0; i < ids.length; i++){
    //   if()
    //   this.create(ids[i], chatId,messageId);
    // }
    return await this.messageService.remove(messageId);
  
}
}