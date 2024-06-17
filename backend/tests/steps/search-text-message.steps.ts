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
import { MessageController } from '../../src/message/message.controller';

const feature = loadFeature('tests/features/search-text-message.feature');

defineFeature(feature, (test) => {
    let testingModule: TestingModule;
    let prismaService: PrismaService;
	let app: INestApplication;
	let response: any;

    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
                controllers: [MessageController],
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
            given(/^existe um user com id "(.*)" e username "(.*)"$/, async function (id,username) {
                let user = await prismaService.user.findUnique({
                    where: {
                        id: Number(id),
                        username: username,
                    } 
                });
                expect(user).not.toBeNull();
            });
        };

		const checkIfConversationExists = ({given}) => {
			given(/^existe uma conversation com id "(.*)" com isGroup "(.*)" e name "(.*)"$/, async function (id, isGroup, name) {
				let conversation = await prismaService.conversation.findUnique({
					where: { 
						id: Number(id),
						name: name == 'null' ? null : name,
						isGroup: (isGroup === 'true'),
					} 
				});
				expect(conversation).not.toBeNull();
			});
		};

		const checkIfUserConversationExists = ({given}) => {
			given(/^existe uma userConversation com userId "(.*)" e conversationId "(.*)" e leftConversation "(.*)" e favorited "(.*)"$/, async function (userId, conversationId, leftConversation, favorited) {
				let userConversation = await prismaService.userConversation.findUnique({
					where: { 
						userId_conversationId:{
							userId: Number(userId),
							conversationId: Number(conversationId), 
						},
						leftConversation: (leftConversation === 'true'),
                        favorited: (favorited === 'true')
					} 
				});
				expect(userConversation).not.toBeNull();
			});
		};

        const checkIfMessagesExists = ({given}) => {
            given(/^existe uma message de id "(.*)" com conversationId "(.*)" com content "(.*)" e createdAt "(.*)" e senderId "(.*)"$/,async function(id,conversationId,content,createdAt,senderId){
                let messages = await prismaService.message.findUnique({
                    where:{
                        id: Number(id),
                        conversationId: Number(conversationId),
                        content: content,
                        createdAt: createdAt,
                        senderId: Number(senderId),
                    }
                });
                expect(messages).not.toBeNull();
            });
        }

		const requestStepGetSearch = ({when}) => {
            when(/^uma requisição "GET" for enviada para "(.*)" sendo o corpo da requisição um JSON com targetWord "(.*)"$/, async function (route, targetWord) {
               response = await request(app.getHttpServer()).get(route).send({
                  "targetWord": targetWord
               });
            });
         };

		const checkStatusResponseStep = ({then}) => {
			then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
				expect(response.status).toBe(Number(status));
			});
		};

        // TESTS
        test('Pesquisar uma mensagem de texto em uma única conversa', async ({given, when, then, and}) => {
            checkIfUserExists({given}); //eu
			checkIfUserExists({given}); //neves

            checkIfConversationExists({given}); // eu e neves

            checkIfUserConversationExists({given}); // userConversation de eu e neves
			checkIfUserConversationExists({given});

            checkIfMessagesExists({given});  // message id 17
            checkIfMessagesExists({given});  // message id 18

            requestStepGetSearch({when});
            checkStatusResponseStep({then});
            
            then(/^o JSON da resposta deve conter content "(.*)" createdAt "(.*)" senderId "(.*)"$/, async function (content,createdAt,senderId){
                expect(response.body).toContainEqual({
                    content: content,
                    createdAt: createdAt,
                    senderId: Number(senderId),
                });
             });

        test('Pesquisar uma mensagem de texto em todas as conversas', async ({given, when, then, and}) => {
            checkIfUserExists({given}); //eu
			checkIfUserExists({given}); //neves
            checkIfUserExists({given}); //luis

            checkIfConversationExists({given}); // eu e neves
            checkIfConversationExists({given}); // eu luis e neves
            checkIfConversationExists({given}); // eu e luis

            checkIfUserConversationExists({given}); // userConversation de eu e neves
			checkIfUserConversationExists({given});

            checkIfUserConversationExists({given});
			checkIfUserConversationExists({given}); // userConversation de eu e neves e luis
            checkIfUserConversationExists({given});
			
            checkIfUserConversationExists({given}); // userConversation de eu e luis
			checkIfUserConversationExists({given});

            checkIfMessagesExists({given});  // message id 17
            checkIfMessagesExists({given});  // message id 18
            checkIfMessagesExists({given});  // message id 19
            checkIfMessagesExists({given});  // message id 20
            checkIfMessagesExists({given});  // message id 21
            checkIfMessagesExists({given});  // message id 22
            checkIfMessagesExists({given});  // message id 23
            
            requestStepGetSearch({when});
            checkStatusResponseStep({then});
            
            then(/^o JSON da resposta deve conter um array mensagens$/, async function () {
				expect(response.body).toBeDefined();
			});
             
            and(/^o elemento de index "(.*)" é uma mensagem que tem content "(.*)" e createdAt "(.*)" e conversationId "(.*)" e senderId "(.*)"$/, async function (index, content, createdAt, conversationId, senderId) {
				expect(response.body[index]).toEqual({
					content: content,
					createdAt: createdAt,
					conversationId: Number(conversationId),
					senderId: Number(senderId),
				});
			});

            and(/^o elemento de index "(.*)" é uma mensagem que tem content "(.*)" e createdAt "(.*)" e conversationId "(.*)" e senderId "(.*)"$/, async function (index, content, createdAt, conversationId, senderId) {
				expect(response.body[index]).toEqual({
					content: content,
					createdAt: createdAt,
					conversationId: Number(conversationId),
					senderId: Number(senderId),
				});
			});

            and(/^o elemento de index "(.*)" é uma mensagem que tem content "(.*)" e createdAt "(.*)" e conversationId "(.*)" e senderId "(.*)"$/, async function (index, content, createdAt, conversationId, senderId) {
				expect(response.body[index]).toEqual({
					content: content,
					createdAt: createdAt,
					conversationId: Number(conversationId),
					senderId: Number(senderId),
				});
			});
        });
    });
});