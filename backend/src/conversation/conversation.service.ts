import { Injectable } from '@nestjs/common';
import { Conversation, Message } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from '../prisma.service';
import { UserConversationService } from '../user-conversation/user-conversation.service';
import { MessageService } from '../message/message.service';
// import { CreateUserConversationDto } from '../user-conversation/dto/create-user-conversation.dto';


@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService, 
    private userConversationService: UserConversationService,
    private messageService: MessageService
  ) {}
  
  async create(loggedId: number, createConversationDto: CreateConversationDto) {
    var ids = createConversationDto['ids'];
    delete createConversationDto['ids'];

    try {
      // Create the conversation
      const conversation = await this.prisma.conversation.create({
        data: createConversationDto,
      });

      // Create userConversation records
      var usersConversation = [];
      for (const id of ids) {
        const userConversation = await this.userConversationService.create({
          userId: id,
          conversationId: conversation['id'],
          owner: (loggedId == id) ? true : false,
          leftConversation: false
        });
        usersConversation.push(userConversation);
      }

      return{
        conversation: conversation,
        usersConversation: usersConversation
        };

    } catch (error) {
      console.error('Error creating conversation or user conversations:', error);
      throw new Error('Failed to create conversation');
    }
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
    return this.prisma.conversation.delete({
      where: { id },
    });
  }
}
