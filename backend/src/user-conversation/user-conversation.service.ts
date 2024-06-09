import { Injectable } from '@nestjs/common';
import { CreateUserConversationDto } from './dto/create-user-conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user-conversation.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserConversationService {
  constructor(private prisma: PrismaService) {}

  async create(createUserConversationDto: CreateUserConversationDto) {
    return this.prisma.userConversation.create({
      data: createUserConversationDto
    });
  }

  async findAll() {
    return `This action returns all userConversation`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} userConversation`;
  }

  async update(id: number, updateUserConversationDto: UpdateUserConversationDto) {
    return `This action updates a #${id} userConversation`;
  }

  async remove(id: number) {
    return `This action removes a #${id} userConversation`;
  }
}
