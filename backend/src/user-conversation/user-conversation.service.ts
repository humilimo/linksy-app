import { Injectable } from '@nestjs/common';
import { CreateUserConversationDto } from './dto/create-user-conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user-conversation.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserConversationService {
  constructor(private prisma: PrismaService) {}

  async create(createUserConversationDto: CreateUserConversationDto) {
    return this.prisma.userConversation.create({
      data: {
        userId: createUserConversationDto.userId,
        conversationId: createUserConversationDto.conversationId,
        owner: createUserConversationDto.owner,
      },
      include:{
        user: {
          select:{
            username: true
          }
        }
      }
    });
  }

  async addUsers(loggedId: number, conversationId: number, ids: {ids: number[]}) {
    let isOwner = await this.prisma.userConversation.findUnique({
      select:{
        owner: true
      },
      where:{
        userId_conversationId:{
          conversationId: conversationId,
          userId: loggedId
        }
      }
    });
    
    if (isOwner.owner == true) {
      //gets all users usernames to be added
      let users = await Promise.all(ids.ids.map(id => this.prisma.user.findUnique({
        where:{
          id: id
        },
        select:{
          id: true,
          username: true
        }
      })));

      const messages = (await Promise.all(users.map(user => this.prisma.$transaction([
        //add each user
        this.prisma.userConversation.upsert({
          where:{
            userId_conversationId:{
              userId: user.id,
              conversationId: conversationId
            }
          },
          update:{
            leftConversation: false
          },
          create:{
            userId: user.id,
            conversationId: conversationId
          }
        }),
        //send a message in conversation that indicates the user has been added
                
        this.prisma.message.create({
          data: {
            content: "'" + user.username + "' foi adicionado ao grupo.",
            senderId: 0,
            conversationId: conversationId
          }
        })
      ])))).map(pair => pair[1].content);
      return messages;
    }
  }

  async deleteUser(loggedId: number, conversationId: number, deleteId: number) {
    let isOwner = await this.prisma.userConversation.findUnique({
      select:{
        owner: true
      },
      where:{
        userId_conversationId:{
          conversationId: conversationId,
          userId: loggedId
        }
      }
    });
    
    if ((loggedId != deleteId && isOwner.owner == true) || (loggedId == deleteId && isOwner.owner == false)) {
      //gets user's username do be deleted
      let userToDelete = await this.prisma.user.findUnique({
        where:{
          id: deleteId
        },
        select:{
          id: true,
          username: true
        }
      });

      let message = (await Promise.all(await this.prisma.$transaction([
        //delete user from group
        this.prisma.userConversation.update({
          where:{
            userId_conversationId:{
              conversationId: conversationId,
              userId: deleteId
            }
          },
          data:{
            leftConversation: true
          }
        }),
        //send a message in conversation that indicates the user has been deleted
        this.prisma.message.create({
          data: {
            content: (isOwner.owner == true)?("'" + userToDelete.username + "' foi removido do grupo."):("'" + userToDelete.username + "' saiu do grupo."),
            senderId: 0,
            conversationId: conversationId
          }
        })
      ])))[1];
      return message;
    }
  }

  async findOne(userId: number, conversationId: number) {
    return await this.prisma.userConversation.findUnique(
      {
        where:{
          userId_conversationId: {
            userId: userId,
            conversationId: conversationId
          }
        },
        include: {
          conversation: true
        }
      }
    );
  }

  async returnToConversation(userId: number, conversationId: number) {
    return this.prisma.userConversation.update({
      where:{
        userId_conversationId: {
          userId: userId,
          conversationId: conversationId
        },
        leftConversation: true
      },
      data:{
        leftConversation: false
      }
    });
  }
  
  async toggleFavorite(loggedId: number, conversationId: number) {
    var requestedConversation = await this.prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId: loggedId,
          conversationId: conversationId,
        },
      },
      select: {
        favorited: true,
      },
    });

    var newFavoritedValue = !requestedConversation.favorited;

    return this.prisma.userConversation.update({
      where: {
        userId_conversationId: {
          userId: loggedId,
          conversationId: conversationId,
        },
      },
      data: {
        favorited: newFavoritedValue,
      },
      select:{
        userId: true,
        conversationId:true,
        leftConversation: true,
        favorited: true
      }
    });
  }
}
