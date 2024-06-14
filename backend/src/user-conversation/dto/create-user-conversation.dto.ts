import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, Length, MinLength, MaxLength, IsString, IsOptional } from 'class-validator';

export class CreateUserConversationDto {
    userId: number
    conversationId: number
    owner: boolean
}
