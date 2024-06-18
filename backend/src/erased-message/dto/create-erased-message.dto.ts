import { Prisma } from "@prisma/client";
import {  IsNotEmpty } from 'class-validator';

export class CreateErasedMessageDto  {
    @IsNotEmpty()
     userId: number;
     chatId: number;
     messageId: number;
    
}
