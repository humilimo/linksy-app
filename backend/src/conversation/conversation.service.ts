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

  async createConversation(loggedId: number, createConversationDto: CreateConversationDto) {
    const { ids, ...conversationData } = createConversationDto;
    return this.prisma.$transaction(async (p) => {
      // Create conversation
      const conversation = await p.conversation.create({
        data: conversationData,
      });

      // Create participants
      var usersConversation = (await Promise.all([loggedId, ...ids].map(id => 
        p.userConversation.create({ 
          data: {
            userId: id,
            conversationId: conversation.id,
            owner: (id == loggedId) && conversation.isGroup
          },
          select:{
            user: {
              select:{
                id: true,
                username: true
              }
            }
          }
        })
      ))).map(uc => uc.user);

      // Find ghost-user
      const ghostUser = await p.user.findUnique({
        where:{
          username: 'linksy'
        }
      })

      // Create  ghost-user in userConversation
      const ghostUserConversation = await p.userConversation.create({
        data: {
          userId: ghostUser.id,
          conversationId: conversation.id,
          owner: false
        }
      });

      if(conversation.isGroup){
        // Create the 'create group' message from system
        const createMessage = await p.message.create({ 
          data:{
            content: "'" + usersConversation.find(uc => uc.id == loggedId).username + "' criou o grupo '" + conversation.name + "'.",
            senderId: ghostUser.id,
            conversationId: conversation.id
          }
        })

        // Create the 'add participant' message from system
        const addMessage = await Promise.all(usersConversation.filter(uc => uc.id != loggedId).map(uc => 
          p.message.create({ 
            data:{
              content: "'" + uc.username + "' foi adicionado ao grupo.",
              senderId: ghostUser.id,
              conversationId: conversation.id
            }
          })
        ));

        return [createMessage, ...addMessage];
      }
      else{
        // create the 'begin conversation' message from system
        const beginMessage = await p.message.create({ 
          data:{
            content: "'" + usersConversation.find(uc => uc.id == loggedId).username + "' iniciou uma comversa com '" + usersConversation.find(uc => uc.id != loggedId).username + "'.",
            senderId: ghostUser.id,
            conversationId: conversation.id
          }
        });

        return beginMessage;
      }
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

  async findConversationInfo(loggedId: number, conversationId: number){
    const conversationInfo = await this.prisma.conversation.findUnique({
      where: {
        id: conversationId,
        userConversations :{
          some: {
            userId: loggedId,
          }
        }
      }
    });
    
    // Group Conversation
    if (conversationInfo.isGroup){
      const participantsInfo = await this.prisma.userConversation.findMany({
        where:{
          conversationId: conversationId,
        },
        select:{
          user:{
            select:{
              id: true,
              name: true,
              username: true,
              picture: true,
            },
          }
        }
      });

      const allConversationInfo = {
        conversation: conversationInfo,
        participants: participantsInfo.map(p => p.user),
      };

      return allConversationInfo;
    }

    // Single Conversation (DM)
    else{ 
      return await this.prisma.user.findFirst({
        select:{
          id: true,
          name: true,
          username: true,
          email: true,
          picture: true,
          bio: true  
        },
        where: {
          id :{
            not: loggedId
          },
          conversations: {
            some: {
              conversationId: conversationId
            }
          }
        }
      });
    }
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
