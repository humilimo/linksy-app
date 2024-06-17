import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { ConversationController } from '../../src/conversation/conversation.controller';
import { ConversationService } from '../../src/conversation/conversation.service';
import { MessageService } from '../../src/message/message.service';
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';
import { PrismaService } from 'src/prisma.service';

const feature = loadFeature('tests/features/get-conversation-messages.feature');

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

    // SCENARIO: Enviar mensagens em conversas

    test('Enviar mensagens em conversas', ({ given, when, then }) => {
        checkIfUserExists({ given });
        checkIfConversationExists({ given });
        checkIfUserConversationExists({ given });

        when(/^uma requisição "POST" for enviada para "(.*)"$/, async function (endpoint) {
            response = await request(app.getHttpServer()).post(endpoint);
        });

        when(/^o corpo da requisição é um JSON com content "(.*)", createdAt "(.*)"$/, async function (content, createdAt) {
            response.send({ content: content, createdAt: createdAt });
        });

        then(/^o status da resposta deve ser "(.*)"$/, function (statusCode) {
            expect(response.status).toBe(Number(statusCode));
        });

        then(/^o JSON da resposta deve conter content "(.*)", senderId "(.*)", conversationId "(.*)", createdAt "(.*)"$/, function (content, senderId, conversationId, createdAt) {
            expect(response.body).toEqual({
                content: content,
                senderId: Number(senderId),
                conversationId: Number(conversationId),
                createdAt: createdAt
            });
        });
    });
});