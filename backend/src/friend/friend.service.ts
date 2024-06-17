import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async create(loggedId: number, username: {username:string}) {

    var user = await this.prisma.user.findUnique({
      select:{ id:true },
      where:{ username: username.username },
    })

    return await this.prisma.friend.create({
      data: {
        requesterId: loggedId,
        receiverId: user.id,
      },
    });
  }
  
  async findAll(loggedId: number) {
  
    var friendsOfLoggedUser = await this.prisma.friend.findMany({
      select:{
        receiver: {
          select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            picture: true
          }
        }  
      },
      where:{                                                                       
        requesterId: loggedId,
      },
    });

    return friendsOfLoggedUser.map(friend => friend.receiver)
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} friend`;
  // }

  // update(id: number, updateFriendDto: UpdateFriendDto) {
  //   return `This action updates a #${id} friend`;
  // }

  async remove(loggedId: number, username: {username:string}) {

    var user = await this.prisma.user.findUnique({
      select:{ id:true },
      where:{ username: username.username },
    })

    return this.prisma.friend.delete({
      where: { 
        requesterId_receiverId: {
          requesterId: loggedId,
          receiverId: user.id,
        },
      },
    });
  } 
}
