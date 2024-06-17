import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../src/prisma.service'
import { UserService } from '../src/user/user.service'
import { ConversationService } from '../src/conversation/conversation.service'
import { UserConversationService } from '../src/user-conversation/user-conversation.service'
import { MessageService } from '../src/message/message.service'

const prisma = new PrismaClient();
const prismaService = new PrismaService();
const userService = new UserService(prismaService);
const userConversationService = new UserConversationService(prismaService);

const messageService = new MessageService(prismaService, null);
const conversationService = new ConversationService(prismaService, userConversationService, messageService);

async function main() {
  await prisma.user.createMany({
    data:[
      {id: 0, username: 'linksy', name: 'linksy', email: 'linksy@cin.ufpe.br', password: 'linksy12345'},
      {id: 1, username: 'man2', name: 'Mateus', email: 'man2@cin.ufpe.br', password: 'mateus12345'},
      {id: 2, username: 'lfoc', name: 'Luis', email: 'lfoc@cin.ufpe.br', password: 'luis12345'},
      {id: 3, username: 'crc', name: 'Caio', email: 'crc@cin.ufpe.br', password: 'caio12345'},
      {id: 4, username: 'gvab', name: 'Gabriel', email: 'gvab@cin.ufpe.br', password: 'gabriel12345'},
      {id: 5, username: 'mms11', name: 'Mariana', email: 'mms11@cin.ufpe.br', password: 'mariana12345'},
      {id: 6, username: 'ljat', name: 'Lucas', email: 'ljat@cin.ufpe.br', password: 'lucas12345'},
    ]
  });

  // Para Testes de MATEUS:

    // Usar Para Deletar Grupo Completamente
    await conversationService.createGroupConversation(1, {isGroup: true, name: "Projeto ESS - Grupo 6", ids: [2], picture: null}); // CONVERSATION ID 1
    
    // Usar Para Retornar à uma Conversa Simples
    // Usar Para Pegar Detalhes de uma Conversa Simples
    await conversationService.createSimpleConversation(1, {isGroup: false, name: null, ids: [2], picture: null}); // CONVERSATION ID 2
    await userConversationService.deleteUser(1, 2, 1);

    // Usar Para Pegar Detalhes de um Grupo
    await conversationService.createGroupConversation(1, {isGroup: true, name: "Grupo com Caio", ids: [3], picture: null, createdAt: "2024-06-14T17:27:20.589Z"}); // CONVERSATION ID 3

  // Para Testes de LUIS:
    // Usar para criar conversa
    await conversationService.createSimpleConversation(2, {isGroup: false, name: null, ids: [4], picture: null}); // CONVERSATION ID 4
    //Usar para enviar mensagem
    await messageService.sendMessage({content: "Oiii, Gabriel!", createdAt: '2024-06-17T00:39:23.430Z'}, 2, 4); // MESSAGE ID 8
    await messageService.sendMessage({content: "Tudo bem?", createdAt: '2024-06-17T00:40:23.430Z'}, 2, 4); // MESSAGE ID 9
    await messageService.sendMessage({content: "Tudo bem simmm!", createdAt: '2024-06-17T00:41:23.430Z'}, 4, 4); // MESSAGE ID 10
    await messageService.sendMessage({content: "E com você ?", createdAt: '2024-06-17T00:42:23.430Z'}, 4, 4); // MESSAGE ID 11

  // Para Testes de ____

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })