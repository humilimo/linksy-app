import { Injectable } from '@nestjs/common';
import { Conversation, Message } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from '../prisma.service';
import { MessageService } from '../message/message.service';


@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService, 
    private messageService: MessageService
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
        conversationId: true
      },
      where:{                                                                       
        userId: loggedId
      },
    })                                                                                                                          

    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);   //Salvando os Ids das conversas que o usuário logado está
  
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
          in: conversationIdsOfLoggedUser,                  //Seleciono apenas as mensagens mais recentes das conversas que o usuário logado está
        },
      },
      distinct: ['conversationId'],
    });

    var conversationIds = recentMessagesByDate.map(conversation=> conversation.conversationId);   // Vetor que tem o ID das conversas mais recentes na ordem correta                                        
    var recentConversations = [];

    for (var conversationId of conversationIds) {
      var conversation = await this.prisma.conversation.findUnique({                    
        where: {
          id: conversationId                                                //Cada elemento é um indice, vou de um em um construindo a lista de conversas recentes
        }
      });

      recentConversations.push(conversation);
    }
  
    return recentConversations;
}

  async findOne(loggedId: number, conversationId: number) {
    var conversation: Conversation = await this.prisma.conversation.findUnique({
      where: {
         id: conversationId
      },
    });
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
