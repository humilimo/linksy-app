import { Prisma } from "@prisma/client";
import {  IsNotEmpty } from 'class-validator';

export class CreateErasedMessageDto implements Prisma.EraseMessagesCreateInput {
    @IsNotEmpty()
     userId: number;
     chatId: number;
     messageId: number;
    
}
