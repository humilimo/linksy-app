export class CreateErasedMessageDto {
    
    

        readonly id_mensagem: number;
        readonly id_remetente: number;
        readonly id_conversa: number;
        readonly conteudo: String;
        readonly momento_envio: String;
    
        constructor(msg: CreateErasedMessageDto) {
          this.id_mensagem = msg.id_mensagem;
          this.id_remetente = msg.id_remetente;
          this.id_conversa = msg.id_conversa;
          this.conteudo = msg.conteudo;
          this.momento_envio = msg.momento_envio;
      
}
}
