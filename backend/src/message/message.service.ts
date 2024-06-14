import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';
import { PrismaService } from '../prisma.service';

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

  async searchMessageInUniqueConversation(loggedId: number,conversationId: number,searchMessageDto: SearchMessageDto)
  {
    var targetWord = searchMessageDto.targetWord;

    var conversationsOfLoggedUser = await this.getConversationsOfLoggedUser(loggedId);
    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);

    if(conversationIdsOfLoggedUser.includes(conversationId)){
      var messages = this.prisma.message.findMany({
        select:{
          content:true,
          createdAt:true,
          senderId:true,
        },
        where:{
          conversationId:{
            in: conversationIdsOfLoggedUser,
          },
          content:{
            contains: targetWord,
          },
        },
      })
      return messages;
    }
    else
      return [];
  } 

  async searchMessageInAllConversations(loggedId: number,searchMessageDto: SearchMessageDto)
  {
    var targetWord = searchMessageDto.targetWord;

    var conversationsOfLoggedUser = await this.getConversationsOfLoggedUser(loggedId);
    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);
    
    var messages = this.prisma.message.findMany({
      select:
      {
        content:true,
        createdAt:true,
        conversationId:true,
        senderId:true,
      },
      where:{
        conversationId:{
          in: conversationIdsOfLoggedUser
        },
        content:{
          contains: targetWord,
        },
      },
      orderBy:{
        id: 'desc'
      },
    })
    return messages;
  }

  async getConversationsOfLoggedUser(loggedId: number)
  {
      var conversationIdsOfLoggedUser = await this.prisma.userConversation.findMany({
      select:{
        conversationId: true,
        favorited: true
      },
      where:{                                                                       
        userId: loggedId,
        leftConversation: false,
      },
    })
      return conversationIdsOfLoggedUser;
  }

}

