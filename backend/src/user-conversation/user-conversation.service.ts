import { Injectable } from '@nestjs/common';
import { CreateUserConversationDto } from './dto/create-user-conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user-conversation.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserConversationService {
  constructor(private prisma: PrismaService) {}

  async create(createUserConversationDto: CreateUserConversationDto) {
    return await this.prisma.userConversation.create({
      data: createUserConversationDto,
      include:{
        user: {
          select:{
            username: true
          }
        }
      }
    });
  }

  async findAll() {
    return `This action returns all userConversation`;
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

  async update(userId: number, conversationId: number, updateUserConversationDto: UpdateUserConversationDto) {
    return this.prisma.userConversation.update({
      where:{
        userId_conversationId: {
          userId: userId,
          conversationId: conversationId
        } 
      },
      data: updateUserConversationDto,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} userConversation`;
  }
}
