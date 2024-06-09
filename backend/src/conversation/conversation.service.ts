import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from '../prisma.service';
import { UserConversationService } from '../user-conversation/user-conversation.service';
// import { CreateUserConversationDto } from '../user-conversation/dto/create-user-conversation.dto';


@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService, 
    private userConversationService: UserConversationService
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
          owner: (loggedId == id) ? true : false
        });
        usersConversation.push(userConversation);
      }

      return{
        conversation: conversation,
        usersConversation: usersConversation
        };

    } catch (error) {
      // Handle error appropriately
      console.error('Error creating conversation or user conversations:', error);
      throw new Error('Failed to create conversation');
    }
  }

  async findAll() {
    // return `This action returns all conversations`;

    return this.prisma.conversation.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  async update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  async remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
