// Importações
import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { ConversationController } from '../../src/conversation/conversation.controller';
import { ConversationService } from '../../src/conversation/conversation.service';
import { MessageService } from '../../src/message/message.service';
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';

const feature = loadFeature('tests/features/delete-conversation-completely.feature');

defineFeature(feature, (test) => {
  let testingModule: TestingModule;
  let prismaService: PrismaService;
	let app: INestApplication;
	let response: any;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
			controllers: [ConversationController],
			providers: [PrismaService, ConversationService, UserConversationService, MessageService]
    }).compile();
		
    prismaService = testingModule.get<PrismaService>(PrismaService);
		app = testingModule.createNestApplication();
		await app.init();
		
  });

  afterAll(async () => {
    await testingModule.close();
		await app.close();
  });


  test('Dono do Grupo Deleta Completamente o Grupo', async ({given, when, then, and}) => {
		given(/^existe um user com id "(.*)"$/, async function (id) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id)
				} 
			});
			expect(user).not.toBeNull();
		});

		and(/^existe uma conversation com id "(.*)", name "(.*)" e isGroup "(.*)"$/, async function (id, name, isGroup) {
			let conversation = await prismaService.conversation.findUnique({
				where: { 
					id: Number(id),
					name: name,
					isGroup: (isGroup === 'true')
				} 
			});
			expect(conversation).not.toBeNull();
		});
		
		and(/^existe uma userConversation com userId "(.*)", conversationId "(.*)" e owner "(.*)"$/, async function (userId, conversationId, owner) {
			let userConversation = await prismaService.userConversation.findUnique({
				where: { 
					userId_conversationId:{
						userId: Number(userId),
						conversationId: Number(conversationId),
					},
					owner: (owner === "true")
				} 
			});
			expect(userConversation).not.toBeNull();
		});

		when(/^uma requisição "DELETE" for enviada para "(.*)"$/, async function (route: string) {
			response = await request(app.getHttpServer()).delete(route);
		});

		and(/^o status da resposta deve ser "(.*)"$/, async function (status) {
			expect(response.status).toBe(Number(status))
		});

		and(/^o JSON da resposta deve conter destroyMessage "(.*)"$/, async function (message) {
			expect(response.body.destroyMessage).toBe(message)
		});
  });
});
