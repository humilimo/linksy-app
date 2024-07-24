import { Injectable,forwardRef,Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';
import { PrismaService } from '../prisma.service';
import { ConversationService } from '../conversation/conversation.service'

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ConversationService))
    private conversationService: ConversationService,
  ) {}

  async sendMessage(createMessageDto: CreateMessageDto, senderId: number,conversationId: number) {
    return this.prisma.message.create({
      data: {
        senderId: senderId,
        conversationId: conversationId,
        content: createMessageDto.content,
        createdAt: createMessageDto.createdAt
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
    return await this.prisma.message.delete({
      where: { id },
    });
  }

  async searchMessageInUniqueConversation(loggedId: number,conversationId: number,searchMessageDto: SearchMessageDto)
  {
    var targetWord = searchMessageDto.targetWord;

    var conversationsOfLoggedUser = await this.conversationService.getConversationsOfLoggedUser(loggedId);
    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);

    if(conversationIdsOfLoggedUser.includes(conversationId)){
      const messages = await this.prisma.message.findMany({
        select:{
          content:true,
          createdAt:true,
          senderId:true,
          id: true,
        },
        where:{
          conversationId: conversationId,
          content:{
            contains: targetWord,
          },
        },
        orderBy:{
          id: 'desc'
        },
      });
      
      const Messages = [];
      for(let i =0;i<messages.length;i++){
        var message = messages[i];

        const sender = await this.prisma.user.findUnique({
          select:{
            name:true,
            username:true,
          },
          where:{
            id: message.senderId
          }
        });

        Messages.push({
          content: messages[i].content,
          createdAt: messages[i].createdAt,
          senderId: messages[i].senderId,
          senderName: `${sender.name} (${sender.username})`,
          id: messages[i].id,
        })
    }
      return Messages;
    }
    else
      return [];
  } 

  async searchMessageInAllConversations(loggedId: number, searchMessageDto: SearchMessageDto) {
    const targetWord = searchMessageDto.targetWord;
  
    const conversationsOfLoggedUser = await this.conversationService.getConversationsOfLoggedUser(loggedId);
    const conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);
  
    const messages = await this.prisma.message.findMany({
      select: {
        content: true,
        createdAt: true,
        conversationId: true,
        senderId: true,
        id: true,
      },
      where: {
        conversationId: {
          in: conversationIdsOfLoggedUser,
        },
        content: {
          contains: targetWord,
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    const Messages = [];
  
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
  
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: message.conversationId },
        select: { name: true, isGroup: true ,id: true},
      });
  
      const sender = await this.prisma.user.findUnique({
        where: { id: message.senderId },
        select: { name: true, username: true },
      });
  
      if (!conversation.isGroup) {
        const otherUserConversation = await this.prisma.userConversation.findFirst({
          select: {
            userId: true,
          },
          where: {
            conversationId: conversation.id,
            userId: {
              notIn: [loggedId, 0],
            },
          },
        });
  
        if (otherUserConversation) {
          const otherUser = await this.prisma.user.findUnique({
            select: {
              name: true,
            },
            where: {
              id: otherUserConversation.userId,
            },
          });
          conversation.name = otherUser.name;
        }
      }

      if(sender.name != "linksy"){
        Messages.push({
          content: message.content,
          createdAt: message.createdAt,
          conversationId: message.conversationId,
          senderId: message.senderId,
          conversationName: conversation.name,
          senderName: `${sender.name} (${sender.username})`,
          id: message.id,
        });
      }
    }
    return Messages;
  }
}

