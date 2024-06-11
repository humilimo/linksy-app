import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, Length, MinLength, MaxLength, IsString} from 'class-validator';

export class CreateConversationDto implements Prisma.ConversationCreateInput {
  name: string
  picture: string
  hasManyUsers: boolean
  ids?: number[]
}
