import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MessageController } from '../../src/message/message.controller';
import { ConversationService } from '../../src/conversation/conversation.service';
import { MessageService } from '../../src/message/message.service';
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';
import { PrismaService } from '../../src/prisma.service';

const feature = loadFeature('tests/features/send-message.feature');

defineFeature(feature, (test) => {
  let testingModule: TestingModule;
  let prismaService: PrismaService;
  let app: INestApplication;
  let response: any;
  let request_json: any;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
        controllers: [MessageController],
        providers: [PrismaService, MessageService, ConversationService, UserConversationService]
    }).compile();
    prismaService = testingModule.get<PrismaService>(PrismaService);
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await testingModule.close();
    await app.close();
  });

    const checkIfUserExists = ({given}) => {
        given(/^existe um user com id "(.*)", username "(.*)"$/, async function (id, username) {
            let user = await prismaService.user.findUnique({
                where: {
                    id: Number(id),
                    username: username
                } 
            });
            expect(user).not.toBeNull();
        });
    };

    const checkIfConversationExists = ({given}) => {
        given(/^existe uma conversation com id "(.*)", name "(.*)", picture "(.*)", isGroup "(.*)"$/, async function (id, name, picture, isGroup) {
            let conversation = await prismaService.conversation.findUnique({
                where: {
                    id: Number(id),
                    name: name == 'null' ? null : name,
                    picture: picture == 'null' ? null : picture,
                    isGroup: isGroup == 'false' ? false : true
                } 
            });
            expect(conversation).not.toBeNull();
        });
    };

    const checkIfUserConversationExists = ({given}) => {
        given(/^existe uma userConversation com userId "(.*)", conversationId "(.*)"$/, async function (userId, conversationId) {
            let userConversation = await prismaService.userConversation.findUnique({
                where: {
                    userId_conversationId:{
                        userId: Number(userId),
                        conversationId: Number(conversationId)
                    }
                } 
            });
            expect(userConversation).not.toBeNull();
        });
    };

    const requestStep = ({when}) => {
        when(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).post(route).send(request_json);
        });
    };

    const checkJsonSteps = ({when}) => {
        when(/^o corpo da requisição é um JSON com content "(.*)" e createdAt "(.*)"$/, async function (content, createdAt) {
            request_json = {
                "content": content,
                "createdAt": createdAt
            };
        });
    };

    const checkStatusResponseStep = ({then}) => {
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        });
    };

    test('Enviar mensagens em conversas', ({ given, when, then }) => {
        checkIfUserExists({ given });
        checkIfUserExists({ given });
        checkIfConversationExists({ given });
        checkIfUserConversationExists({ given });
        checkIfUserConversationExists({ given });
        
        checkJsonSteps({ when });

        requestStep({ when });

        checkStatusResponseStep({ then });

        then(/^o JSON da resposta deve conter content "(.*)", senderId "(.*)", conversationId "(.*)" e createdAt "(.*)"$/, function (content, senderId, conversationId, createdAt) {
            const {id, ...restBody} = response.body
            expect(restBody).toEqual({
                content: content,
                senderId: Number(senderId),
                conversationId: Number(conversationId),
                createdAt: createdAt
            });
        });
    });
});