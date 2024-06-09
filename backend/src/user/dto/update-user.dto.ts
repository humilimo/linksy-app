import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, Length, MinLength, MaxLength, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    bio: string;
    picture: string;
}
