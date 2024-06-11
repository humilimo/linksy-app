import { Injectable } from '@nestjs/common';
import { Conversation, Message } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from '../prisma.service';
import { MessageService } from '../message/message.service';
import { UserConversationService } from '../user-conversation/user-conversation.service';

@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService, 
    private userConversationService: UserConversationService,
    private messageService: MessageService,
  ) {}

  async create(loggedId: number, createConversationDto: CreateConversationDto) {
    const { ids, ...conversationData } = createConversationDto;
    return this.prisma.$transaction(async (p) => {
      // Create conversation
      const conversation = await p.conversation.create({
        data: conversationData,
      });

      // Create owner userConversation
      const ownerUserConversation = await p.userConversation.create({
        data: {
          userId: loggedId,
          conversationId: conversation.id,
          owner: true
        }
      });

      // Create members userConversation
      const membersUserConversation = await Promise.all(ids.map(id => 
        p.userConversation.create({ 
          data: {
            userId: id,
            conversationId: conversation.id,
            owner: false
          } 
        })
      ));
      
      const usersConversation = [ownerUserConversation, ...membersUserConversation];
  
      return {
        conversation,
        usersConversation
      };
    });
  }

  async findAll(loggedId: number) {
    return this.getRecentConversations(loggedId);
  }

  async getRecentConversations(loggedId: number) {
    var conversationsOfLoggedUser = await this.prisma.userConversation.findMany({
      select:{
        conversationId: true,
        favorited: true
      },
      where:{                                                                       
        userId: loggedId
      },
    })          
    
    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);

    var favoritedConversationsIdsOfLoggedUser = conversationsOfLoggedUser
      .filter(conversation => conversation.favorited === true)
      .map(conversation => conversation.conversationId);
    
    var recentMessagesByDate = await this.prisma.message.findMany({ 
      select: {
        conversationId: true,
        createdAt: true,
      },
      orderBy: {
        id: 'desc',
      },
      where:{
        conversationId:{
          in: conversationIdsOfLoggedUser,                  
        },
      },
      distinct: ['conversationId'],
    });

    var recentConversationsIdsOfLoggedUser = recentMessagesByDate.map(conversation=> conversation.conversationId);        
    
    var nonFavoritedRecentConversationsIds = recentConversationsIdsOfLoggedUser.filter(
      conversationId => !favoritedConversationsIdsOfLoggedUser.includes(conversationId)  
    );

    var recentConversationsIds = favoritedConversationsIdsOfLoggedUser.concat(nonFavoritedRecentConversationsIds);

    var recentConversations = [];
    for (var conversationId of recentConversationsIds) {
      var conversation = await this.prisma.conversation.findUnique({                    
        where: {
          id: conversationId                                                
        }
      });

      recentConversations.push(conversation);
    }
  
    return recentConversations;
}

  async findOne(loggedId: number, conversationId: number) {
    var userConversation = await this.userConversationService.findOne(loggedId, conversationId);
    var conversation = userConversation.conversation;
    var messagesFromConversation = await this.messageService.findAllMessagesFromConversation(loggedId, conversationId);
    var conversationAndMessages = {
      conversation: conversation,
      messages: messagesFromConversation
    }
    return conversationAndMessages
  }

  async update(id: number, updateConversationDto: UpdateConversationDto) {
    return this.prisma.conversation.update({
      where: { id },
      data: updateConversationDto,
    });
  }

  async remove(id: number) {
    return "Apagar para uma pessoa especifica aqui";
    return this.prisma.conversation.delete({
      where: { id },
    });
  }

  async removeAll(loggedId:number, conversationId: number) {
    const userConversation = await this.prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId: loggedId,
          conversationId: conversationId
        },
        owner: true
      },
    });

    return this.prisma.conversation.delete({
      where: {
        id: userConversation['conversationId']
      },
    });
  }
}
