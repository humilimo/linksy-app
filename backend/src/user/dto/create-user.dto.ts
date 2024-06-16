import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, Length, MinLength, MaxLength, IsString, IsOptional } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
    @IsNotEmpty()
    @IsString()
    name:  string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;   
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    bio?: string;
    picture?: string;
}
