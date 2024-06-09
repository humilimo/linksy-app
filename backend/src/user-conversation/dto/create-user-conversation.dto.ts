import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, Length, MinLength, MaxLength, IsString, IsOptional } from 'class-validator';

export class CreateUserConversationDto {
    @IsNotEmpty()
    userId: number
    @IsNotEmpty()
    conversationId: number
    owner: boolean | false
}
