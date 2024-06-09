import { Prisma } from "@prisma/client"
export class CreateMessageDto {
  senderId: number
  conversationId: number
  content: string
}