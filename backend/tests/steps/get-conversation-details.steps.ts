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

const feature = loadFeature('tests/features/get-conversation-details.feature');

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

	// SHARED STEPS
		
		const checkIfUserExists = ({given}) => {
			given(/^existe um user com id "(.*)", name "(.*)", username "(.*)", email "(.*)", picture "(.*)" e bio "(.*)"$/, async function (id, name, username, email, picture, bio) {
				let user = await prismaService.user.findUnique({
					where: {
						id: Number(id),
						name: name,
						username: username,
						email: email,
						picture: picture == 'null' ? null : picture,
						bio: bio == 'null' ? null : bio
					} 
				});
				expect(user).not.toBeNull();
			});
		};

		const checkIfConversationExists = ({given}) => {
			given(/^existe uma conversation com id "(.*)", name "(.*)", picture "(.*)", isGroup "(.*)" e createdAt "(.*)"$/, async function (id, name, picture, isGroup, createdAt) {
				let conversation = await prismaService.conversation.findUnique({
					where: { 
						id: Number(id),
						name: name == 'null' ? null : name,
						picture: picture == 'null' ? null : picture,
						isGroup: (isGroup === 'true'),
						createdAt: createdAt
					} 
				});
				expect(conversation).not.toBeNull();
			});
		};

		const checkIfUserConversationExists = ({given}) => {
			given(/^existe uma userConversation com userId "(.*)", conversationId "(.*)" e owner "(.*)"$/, async function (userId, conversationId, owner) {
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
		};

		const requestStep = ({when}) => {
			when(/^uma requisição "GET" for enviada para "(.*)"$/, async function (route) {
				response = await request(app.getHttpServer()).get(route);
			});
		};

		const checkStatusResponseStep = ({then}) => {
			then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
				expect(response.status).toBe(Number(status));
			});
		};

	// TESTS

		test('Obter Detalhes de um Grupo', async ({given, when, then, and}) => {
			checkIfUserExists({given});
			checkIfUserExists({given});

			checkIfConversationExists({given});

			checkIfUserConversationExists({given});
			checkIfUserConversationExists({given});

			requestStep({when});

			checkStatusResponseStep({then});

			then(/^o JSON da resposta deve conter owner "(.*)"$/, async function (owner) {
				expect(response.body.owner).toBe(owner === 'true');
			});

			then(/^o JSON da resposta deve conter conversation com id "(.*)", name "(.*)", picture "(.*)", isGroup "(.*)" e createdAt "(.*)"$/, async function (id, name, picture, isGroup, createdAt) {
				expect(response.body.conversation).toEqual({
					id: Number(id),
					name: name,
					picture: picture == 'null' ? null : picture,
					isGroup: (isGroup === 'true'),
					createdAt: createdAt
				});
			});

			then(/^o JSON da resposta deve conter um array participants$/, async function () {
				expect(response.body.participants).toBeDefined();
			});

			then(/^o array participants deve conter o participant com id "(.*)", name "(.*)", username "(.*)" e picture "(.*)"$/, async function (id, name, username, picture) {
				expect(response.body.participants).toContainEqual({
					id: Number(id),
					name: name,
					username: username,
					picture: picture == 'null' ? null : picture
				});
			});

			then(/^o array participants deve conter o participant com id "(.*)", name "(.*)", username "(.*)" e picture "(.*)"$/, async function (id, name, username, picture) {
				expect(response.body.participants).toContainEqual({
					id: Number(id),
					name: name,
					username: username,
					picture: picture == 'null' ? null : picture
				});
			});
		});

		test('Obter Detalhes de uma Conversa Simples', async ({given, when, then}) => {
			checkIfUserExists({given});
			checkIfUserExists({given});

			checkIfConversationExists({given});

			checkIfUserConversationExists({given});
			checkIfUserConversationExists({given});

			requestStep({when});

			checkStatusResponseStep({then});

			then(/^o JSON da resposta deve conter id "(.*)", name "(.*)", username "(.*)", email "(.*)", picture "(.*)" e bio "(.*)"$/, async function (id, name, username, email, picture, bio) {
				expect(response.body).toEqual({
					id: Number(id),
					name: name,
					username: username,
					email: email,
					picture: picture == 'null' ? null : picture,
					bio: bio == 'null' ? null : bio
				});
			});
		});
});