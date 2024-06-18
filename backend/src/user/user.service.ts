import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

const jwt = require('jsonwebtoken');
const SECRET = 'LINKSY';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        picture: true,
        bio: true,
       }
    });
  }

  async findFriend(loggedId: number, id: number) {
    return this.prisma.user.findUnique({
      where: { 
        id: id,
        friendOf:{
          some: {
            requesterId: loggedId
          }
        }
      },
      select: {
        id: true,
        name: true,
        username: true,
        picture: true,
        bio: true,
       }
    });
  }

  async update(loggedId: number, updateUserDto: UpdateUserDto) {

    const { email, username } = updateUserDto;

    // Verifica se o e-mail já está em uso
    if (email) {
      const existingUserWithEmail = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUserWithEmail && existingUserWithEmail.id !== loggedId) {
        throw new BadRequestException('Este email já está em uso.');
      }
    }

    // Verifica se o username já está em uso
    if (username) {
      const existingUserWithUsername = await this.prisma.user.findUnique({
        where: { username },
      });

      if (existingUserWithUsername && existingUserWithUsername.id !== loggedId) {
        throw new BadRequestException('Este username já está em uso.');
      }
    }

    return this.prisma.user.update({
      where: { id:loggedId },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async login(user: {username: string, password: string}) {

    var checkUser = await this.prisma.user.findUnique({
        select: { id: true },
        where: { username: user.username, password: user.password },
    });

    if (checkUser) {
        const token = jwt.sign({ userId: checkUser.id }, SECRET, { expiresIn: 300 });
        return { auth: true, token };
    }

    const createError = require('http-errors');
    throw createError(401, 'Unauthorized');
  } 

}
