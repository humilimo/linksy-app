import { Injectable,forwardRef,Inject } from '@nestjs/common';
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
    @Inject(forwardRef(() => MessageService))
    private messageService: MessageService,
  ) {}

  async createGroupConversation(loggedId: number, createConversationDto: CreateConversationDto){
    const { ids, ...conversationData } = createConversationDto;
    const conversationId = await this.prisma.$transaction(async p => {
    
      // add conversation
      const conversation = await this.prisma.conversation.create({
        data: conversationData
      });

      // add owner
      const owner = await this.userConversationService.create({
        userId: loggedId,
        conversationId: conversation.id,
        owner: true
      });

      // add ghost-user
      const ghostUser = await this.userConversationService.create({
        userId: 0,
        conversationId: conversation.id,
        owner: false
      });
      
      // Create the 'create group' message from system
      const createMessage = (await this.messageService.sendMessage(
        {content: "'" + owner.user.username + "' criou o grupo '" + conversation.name + "'."},
        0, //ghost-user Id
        conversation.id
      )).content;

      return conversation.id;
    });
    
    await this.userConversationService.addUsers(loggedId, conversationId, {ids: ids});

    return {
      conversationId: conversationId,
      message: "create group"
    };
  }

  async createSimpleConversation(loggedId: number, createConversationDto: CreateConversationDto){
    const { ids, ...conversationData } = createConversationDto;
    const conversationId = await this.checkIfSimpleConversationExists(loggedId, ids[0]);
    
    if (conversationId){
      const leftConversation = await this.checkIfLeftConversation(loggedId, conversationId);

      if (leftConversation){
        await this.userConversationService.returnToConversation(loggedId, conversationId);

        return {
          conversationId: conversationId,
          message: "return"
        }
      }

      return {
        conversationId: conversationId,
        message: "open"
      }
    }

    // add conversation
    const conversation = await this.prisma.conversation.create({
      data: conversationData
    });

    // add logged user
    const loggedUser = await this.userConversationService.create({
      userId: loggedId,
      conversationId: conversation.id,
      owner: false
    });

    // add other user
    const otherUser = await this.userConversationService.create({
      userId: ids[0],
      conversationId: conversation.id,
      owner: false
    });

    // add ghost-user
    const ghostUser = await this.userConversationService.create({
      userId: 0,
      conversationId: conversation.id,
      owner: false
    });
    
    return {
      conversationId: conversation.id,
      message: "create" 
    }
  }

  async checkIfLeftConversation(loggedId: number, conversationId: number){
    return (await this.prisma.userConversation.findUnique({
      where:{
        userId_conversationId: {
          conversationId: conversationId,
          userId: loggedId
        }
      },
      select:{
        leftConversation: true
      }
    })).leftConversation;
  }

  async checkIfSimpleConversationExists(loggedId: number, otherId: number){
    
    const loggedIdConversations = (await this.prisma.userConversation.findMany({
      select:{
        conversationId: true
      },
      where: {
        userId: loggedId,
        conversation: {
          isGroup: false
        }
      }
    })).map(uc => uc.conversationId);

    const otherIdConversations = (await this.prisma.userConversation.findMany({
        select:{
          conversationId: true
        },
        where: {
          userId: otherId,
          conversation: {
            isGroup: false
          }
        }
    })).map(uc => uc.conversationId);

    return loggedIdConversations.filter(uc => otherIdConversations.includes(uc))[0];
  };

  async getRecentConversations(loggedId: number) {
    const conversationsOfLoggedUser = await this.getConversationsOfLoggedUser(loggedId);
  
    const conversationIdsOfLoggedUser = conversationsOfLoggedUser.map(conversation => conversation.conversationId);
    const favoritedConversationsIdsOfLoggedUser = conversationsOfLoggedUser
      .filter(conversation => conversation.favorited === true)
      .map(conversation => conversation.conversationId);
    
    const recentMessagesByDate = await this.getRecentMessagesByDate(conversationIdsOfLoggedUser);
  
    const recentConversationsIdsOfLoggedUser = recentMessagesByDate.map(conversation => conversation.conversationId);        
    const nonFavoritedRecentConversationsIds = recentConversationsIdsOfLoggedUser.filter(
      conversationId => !favoritedConversationsIdsOfLoggedUser.includes(conversationId)
    );
  
    const recentConversationsIds = favoritedConversationsIdsOfLoggedUser.concat(nonFavoritedRecentConversationsIds);
  
    const recentConversations = [];
    for (const conversationId of recentConversationsIds) {
      const conversation = await this.prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          userConversations: {
            select: {
              favorited: true,
            },
            where: {
              userId: loggedId,
            }
          }
        }
      });
      
      const { userConversations, ...conversationWithoutUserConversations } = conversation;
      
      const lastMessage = await this.prisma.message.findFirst({
        select:{
          content:true,
        },
        orderBy: {
          id: 'desc',
        },
        where:{
          conversationId: conversationId
        }
      });
      
      const mergedInfos = {
        ...conversationWithoutUserConversations,
        favorited: userConversations[0].favorited,
        lastMessage: lastMessage.content, 
      };
      
      if(!conversation.isGroup){
        const otherUserConversation = await this.prisma.userConversation.findFirst({
          select: {
            userId: true,
          },
          where: {
            conversationId: conversationId,
            userId: {
              notIn: [loggedId, 0],
            },
          },
        });
        
        const nameOfOtherUser = await this.prisma.user.findUnique({
          select:{
            name:true,
          },
          where:{
            id: otherUserConversation.userId,
          }
        });

        mergedInfos.name = nameOfOtherUser.name;
      }

      recentConversations.push(mergedInfos);
    }
  
    return recentConversations;
  }
  
async getConversationsOfLoggedUser(loggedId: number) {
  const conversationIdsOfLoggedUser = await this.prisma.userConversation.findMany({
    select: {
      conversationId: true,
      favorited: true
    },
    where: {                                                                       
      userId: loggedId,
      leftConversation: false,
    },
  });
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

  async getConversationInfo(loggedId: number, conversationId: number){
    const conversationInfo = await this.prisma.conversation.findUnique({
      where: {
        id: conversationId,
        userConversations :{
          some: {
            userId: loggedId,
            leftConversation: false
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
          },
          leftConversation: false
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
        },
        orderBy: [
          { owner: 'desc' },
          { user: { name: 'asc' } }
        ]
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

      return user
    }
  }

  async updateGroupName(loggedId: number, conversationId: number, name: {name: string}) {
    let user = await this.prisma.userConversation.findUnique({
      select:{
        owner: true,
        user: true
      },
      where:{
        userId_conversationId:{
          conversationId: conversationId,
          userId: loggedId
        }
      }
    });
    if (user.owner == true) {
      let message = (await this.prisma.$transaction([
        this.prisma.conversation.update({
          where: {
            id: conversationId
          },
          data: {
            name: name.name
          },
        }),
        this.prisma.message.create({
          data: {
            content: "'" + user.user.username + "' alterou o nome do grupo para '" + name.name + "'.",
            senderId: 0,
            conversationId: conversationId
          }
        })
      ]))[1];
      return {newNameMessage: message.content}
    }

  }

  async removeAll(loggedId: number, conversationId: number, groupName: string) {
    const userConversation = await this.prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId: loggedId,
          conversationId: conversationId
        },
        owner: true
      },
      include:{
        conversation:{
          select:{
            name: true
          }
        }
      }
    });

    if (userConversation.conversation.name == groupName){
      const conversation = await this.prisma.conversation.delete({
        where: {
          id: userConversation.conversationId
        },
      });
      return {destroyMessage: "Grupo '" + conversation.name + "' deletado completamente."}
    }

    else{
      return {wrongNameMessage: "O nome do grupo inserido está incorreto."}
    }

  }
}
