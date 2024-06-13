import { Injectable } from '@nestjs/common';
import { Conversation, Message } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from '../prisma.service';
import { MessageService } from '../message/message.service';
import { UserConversationService } from '../user-conversation/user-conversation.service';
import { SearchMessageDto } from 'src/message/dto/search-message.dto';
import { contains } from 'class-validator';

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

      // Create  ghost-user in userConversation
      const ghostUserConversation = await p.userConversation.create({
        data: {
          userId: 0, //ghost-user Id
          conversationId: conversation.id,
          owner: false
        }
      });

      if(conversation.isGroup){
        // Create the 'create group' message from system
        const createMessage = await p.message.create({ 
          data:{
            content: "'" + usersConversation.find(uc => uc.id == loggedId).username + "' criou o grupo '" + conversation.name + "'.",
            senderId: 0, //ghost-user Id
            conversationId: conversation.id
          }
        })

        // Create the 'add participant' message from system
        const addMessage = await Promise.all(usersConversation.filter(uc => uc.id != loggedId).map(uc => 
          p.message.create({ 
            data:{
              content: "'" + uc.username + "' foi adicionado ao grupo.",
              senderId: 0, //ghost-user Id
              conversationId: conversation.id
            }
          })
        ));

        return {
          createMessage: createMessage,
          addMessage: addMessage
        };
      }
      else{
        // create the 'begin conversation' message from system
        const beginMessage = await p.message.create({ 
          data:{
            content: "'" + usersConversation.find(uc => uc.id == loggedId).username + "' iniciou uma comversa com '" + usersConversation.find(uc => uc.id != loggedId).username + "'.",
            senderId: 0, //ghost-user Id
            conversationId: conversation.id
          }
        });

        return beginMessage;
      }
    });
  }

  async getRecentConversations(loggedId: number) {

    var conversationsOfLoggedUser = await this.getConversationsOfLoggedUser(loggedId);

    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);
    var favoritedConversationsIdsOfLoggedUser = conversationsOfLoggedUser
      .filter(conversation => conversation.favorited === true)
      .map(conversation => conversation.conversationId);
    
    var recentMessagesByDate = await this.getRecentMessagesByDate(conversationIdsOfLoggedUser);

    var recentConversationsIdsOfLoggedUser = recentMessagesByDate.map(conversation=> conversation.conversationId);        
    var nonFavoritedRecentConversationsIds = recentConversationsIdsOfLoggedUser.filter(
      conversationId => !(favoritedConversationsIdsOfLoggedUser.includes(conversationId))  
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

  async getRecentMessagesByDate(conversationIdsOfLoggedUser :number[]){
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
    return recentMessagesByDate;
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
          userId: {
            not: 0 //ghost-user Id
          }
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

      return {
        conversation: conversationInfo,
        participants: participantsInfo.map(p => p.user),
      }
    }

    // Single Conversation (DM)
    else{ 
      const user = await this.prisma.user.findFirst({
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
            notIn: [loggedId, 0],  //loggedId and ghost-user Id
          },
          conversations: {
            some: {
              conversationId: conversationId
            }
          }
        }
      });

      return {user: user}
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

    const conversation = await this.prisma.conversation.delete({
      where: {
        id: userConversation['conversationId']
      },
    });

    return {destroyMessage: "Grupo '" + conversation.name + "' deletado completamente."}
  }
}
