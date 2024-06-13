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

  async createConversation(loggedId: number, createConversationDto: CreateConversationDto){
    if(!createConversationDto.isGroup){
      const conversationExists = await this.checkIfSimpleConversationExists(loggedId, createConversationDto.ids[0]);
  
      if (conversationExists){
  
        await this.userConversationService.update(conversationExists.userId, conversationExists.conversationId, {leftConversation: false});
        
        return {re_enterMessage: "Usuário de id '" + loggedId + "' voltou à conversa."};
      }
    }

    return await this.prisma.$transaction(async p => {
      const {conversation, usersConversation} = await this.createConversationAndParticipants(loggedId, createConversationDto);
  
      if(createConversationDto.isGroup){
        // Create the 'create group' message from system
        const createMessage = await this.messageService.sendMessage(
          {content: "'" + usersConversation.find(uc => uc.userId == loggedId).user.username + "' criou o grupo '" + conversation.name + "'."},
          0, //ghost-user Id
          conversation.id
        );
  
        // Create the 'add participant' message from system
        const addMessage = await Promise.all(usersConversation.filter(uc => uc.userId != loggedId).map(uc => 
          this.messageService.sendMessage(
            {content: "'" + uc.user.username + "' foi adicionado ao grupo."},
            0, //ghost-user Id
            conversation.id
          )
        ));
  
        return {
          createMessage: createMessage,
          addMessage: addMessage
        };
      }
      else{
        // Create the 'begin conversation' message from system
        const beginMessage = this.messageService.sendMessage(
          {content: "'" + usersConversation.find(uc => uc.userId == loggedId).user.username + "' iniciou uma conversa com '" + usersConversation.find(uc => uc.userId != loggedId).user.username + "'."},
          0, //ghost-user Id
          conversation.id
        );
  
        return beginMessage;
      }
    });
  }

  async checkIfSimpleConversationExists(loggedId: number, otherId: number){
    return await this.prisma.userConversation.findFirst({
      where: {
        userId: loggedId, // Verify if userId is equal to loggedId
        leftConversation: true, // Verify if the user left the conversation
        conversation: {
          isGroup: false, //Verify if the conversation is not a group
          userConversations:{
            some:{ //Verify if this conversation is with the other user
              userId: otherId
            }
          }
        }
      }
    });
  };

  async createConversationAndParticipants(loggedId: number, createConversationDto: CreateConversationDto){
    const { ids, ...conversationData } = createConversationDto;
    
    // add conversation
    const conversation = await this.prisma.conversation.create({
      data: conversationData
    });

    // add users to conversation
    const usersConversation = await Promise.all([loggedId, ...ids].map(id => 
      this.userConversationService.create({
        userId: id,
        conversationId: conversation.id,
        owner: (id == loggedId) && conversationData.isGroup
      })
    ));

    // add ghost-user to conversation
    await this.userConversationService.create({
      userId: 0, //ghost-user Id
      conversationId: conversation.id,
      owner: false
    });

    return {
      conversation: conversation, 
      usersConversation: usersConversation
    }
  }

  async getRecentConversations(loggedId: number) {

    var conversationsOfLoggedUser = await this.getConversationsIdsofLoggedUser(loggedId);

    var conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);
    var favoritedConversationsIdsOfLoggedUser = conversationsOfLoggedUser
      .filter(conversation => conversation.favorited === true)
      .map(conversation => conversation.conversationId);
    
    var recentMessagesByDate = await this.getRecentMessagesByDate(conversationIdsOfLoggedUser);

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
  
  async getConversationsIdsofLoggedUser(loggedId: number)
  {
      var ids = await this.prisma.userConversation.findMany({
      select:{
        conversationId: true,
        favorited: true
      },
      where:{                                                                       
        userId: loggedId
      },
    })
      return ids;
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
      const isOwner = (await this.prisma.userConversation.findUnique({
        where: { 
          userId_conversationId: {
            userId: loggedId,
            conversationId: conversationId
          }
        },
        select: {
          owner: true
        }
      })).owner;
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
        owner: isOwner,
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
        id: userConversation.conversationId
      },
    });

    return {destroyMessage: "Grupo '" + conversation.name + "' deletado completamente."}
  }
}
