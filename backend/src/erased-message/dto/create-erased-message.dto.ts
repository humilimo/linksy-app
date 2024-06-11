export class CreateErasedMessageDto {
   
        readonly userId: number;
        readonly chatId: number;
        readonly messageId: number;
      
        constructor(msg: CreateErasedMessageDto) {
          this.userId = msg.userId;
          this.chatId = msg.chatId;
          this.messageId = msg.messageId;
         
        }
      
}
