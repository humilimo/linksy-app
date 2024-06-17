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

const feature = loadFeature('tests/features/create-conversation.feature');

defineFeature(feature, (test) => {
  let testingModule: TestingModule;
  let prismaService: PrismaService;
	let app: INestApplication;
	let response: any;
	let request_json: any;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
			controllers: [ConversationController],
			providers: [PrismaService, ConversationService, UserConversationService, MessageService]
    }).compile();
		
    prismaService = testingModule.get<PrismaService>(PrismaService);
		app = testingModule.createNestApplication();
		await app.init();
		
  });

	// beforeEach(async () => {
	// 	execSync('npx prisma migrate reset --force');
	// });

  afterAll(async () => {
    await testingModule.close();
		await app.close();
  });


  test('Criar um Grupo', async ({given, when, then, and}) => {
		given(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id, username) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id),
					username: username
				} 
			});
			expect(user).not.toBeNull();
		});

		and(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id, username) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id),
					username: username
				} 
			});
			expect(user).not.toBeNull();
		});


		when(/^o corpo da requisição é um JSON com isGroup "(.*)", name "(.*)", picture "(.*)" e o array de inteiros ids$/, async function (isGroup, name, picture) {
			request_json = {
				"isGroup": (isGroup === 'true'),
				"name": name == 'null' ? null : name,
				"picture": picture == 'null' ? null : picture,
				"ids": [],
			};
		});

		and(/^o array ids deve conter o inteiro "(.*)"$/, async function (id) {
			request_json.ids.push(Number(id));
		});

		and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
			response = await request(app.getHttpServer()).post(route).send(request_json);
		});

		then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
			expect(response.status).toBe(Number(status));
		});

		and(/^o JSON da resposta deve conter createMessage "(.*)"$/, async function (createMessage) {
			expect(response.body.createMessage).toBe(createMessage);
		});

		and(/^o JSON da resposta deve conter o array de strings addMessages$/, async function () {
			expect(response.body.addMessages).toBeDefined();
		});

		and(/^o array addMessages deve conter a string "(.*)"$/, async function (addMessage) {
			expect(response.body.addMessages).toContain(addMessage);
		});
  });

  test('Criar uma Conversa Simples', async ({given, when, then, and}) => {
		given(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id, username) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id),
					username: username
				} 
			});
			expect(user).not.toBeNull();
		});

		and(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id, username) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id),
					username: username
				} 
			});
			expect(user).not.toBeNull();
		});


		when(/^o corpo da requisição é um JSON com isGroup "(.*)" e o array de inteiros ids$/, async function (isGroup) {
			request_json = {
				"isGroup": (isGroup === 'true'),
				"ids": []
			};
		});

		and(/^o array ids deve conter o inteiro "(.*)"$/, async function (id) {
			request_json.ids.push(Number(id));
		});

		and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
			response = await request(app.getHttpServer()).post(route).send(request_json);
		});

		then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
			expect(response.status).toBe(Number(status));
		});

		and(/^o JSON da resposta deve conter beginMessage "(.*)"$/, async function (beginMessage) {
			expect(response.body.beginMessage).toBe(beginMessage);
		});
  });

  test('Retornar para uma Conversa Simples', async ({given, when, then, and}) => {
		given(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id, username) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id),
					username: username
				} 
			});
			expect(user).not.toBeNull();
		});

		and(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id, username) {
			let user = await prismaService.user.findUnique({
				where: {
					id: Number(id),
					username: username
				} 
			});
			expect(user).not.toBeNull();
		});

		and(/^existe uma conversation com id "(.*)" e isGroup "(.*)"$/, async function (id, isGroup) {
			let conversation = await prismaService.conversation.findUnique({
				where: { 
					id: Number(id),
					isGroup: (isGroup === 'true')
				} 
			});
			expect(conversation).not.toBeNull();
		});

		and(/^existe uma userConversation com userId "(.*)", conversationId "(.*)", owner "(.*)" e leftConversation "(.*)"$/, async function (userId, conversationId, owner, leftConversation) {
			let userConversation = await prismaService.userConversation.findUnique({
				where: { 
					userId_conversationId:{
						userId: Number(userId),
						conversationId: Number(conversationId),
					},
					owner: (owner === "true"),
					leftConversation: (leftConversation === 'true')
				} 
			});
			expect(userConversation).not.toBeNull();
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


		when(/^o corpo da requisição é um JSON com isGroup "(.*)" e o array de inteiros ids$/, async function (isGroup) {
			request_json = {
				"isGroup": (isGroup === 'true'),
				"ids": []
			};
		});

		and(/^o array ids deve conter o inteiro "(.*)"$/, async function (id) {
			request_json.ids.push(Number(id));
		});

		and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
			response = await request(app.getHttpServer()).post(route).send(request_json);
		});

		then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
			expect(response.status).toBe(Number(status));
		});

		and(/^o JSON da resposta deve conter returnMessage "(.*)"$/, async function (returnMessage) {
			expect(response.body.returnMessage).toBe(returnMessage);
		});
  });
});
