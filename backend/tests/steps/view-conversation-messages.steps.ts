import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConversationController } from '../../src/conversation/conversation.controller'; 
import { ConversationService } from '../../src/conversation/conversation.service';
import { MessageService } from '../../src/message/message.service';
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';
import { PrismaService } from '../../src/prisma.service';

const feature = loadFeature('tests/features/view-conversation-messages.feature');

defineFeature(feature, (test) => {
  let testingModule: TestingModule;
  let prismaService: PrismaService;
  let app: INestApplication;
  let response: any;
  let mockInfo: any;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [ConversationController],
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

    const checkIfUserExistsStep = ({given}) => {
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

    const checkIfMessageExists = ({given}) => {
      given(/^existe uma mensagem com id "(.*)", content "(.*)", senderId "(.*)" e conversationId "(.*)"$/, async function (id, content, senderId, conversationId) {
        let message = await prismaService.message.findUnique({
          where: {
            id: Number(id),
            content: content,
            senderId: Number(senderId),
            conversationId: Number(conversationId)
          }
        });
        expect(message).not.toBeNull();
      });
    };
    
    const givenSteps = ({ given }) => {
      checkIfUserExistsStep({ given });
      checkIfUserExistsStep({ given });
      checkIfConversationExists({ given });
      checkIfUserConversationExists({ given });
      checkIfUserConversationExists({ given });
      checkIfMessageExists({ given });
      checkIfMessageExists({ given });
      checkIfMessageExists({ given });
      checkIfMessageExists({ given });
      checkIfMessageExists({ given });
    };

    const requisition = ({when}) => {
      when(/^uma requisição "GET" for enviada para "(.*)"$/, async function (route) {
        response = await request(app.getHttpServer()).get(route);
      });
    }

    const requisitionStatus = ({then}) => {
      then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
        expect(response.status).toBe(Number(status));
      });
    };

		const checkJsonSteps = ({then}) => {
      then(/^a resposta é um JSON com id "(.*)", name "(.*)", picture "(.*)", isGroup "(.*)" e createdAt "(.*)" e um vetor de mensagens$/, async function (id, name, picture, isGroup, createdAt) {
        expect(response.body.conversation).toEqual({
          id: Number(id),
          name: name == 'null' ? null : name,
          picture: picture == 'null' ? null : picture,
          isGroup: isGroup == 'false' ? false : true,
          createdAt: createdAt
        });
        expect(response.body.messages).toBeInstanceOf(Array);
      });
    };
    
    const listContainsMessages = ({then}) => {
      then(/^a lista de mensagens deve conter uma mensagem com id "(.*)", content "(.*)", senderId "(.*)", conversationId "(.*)" e createdAt "(.*)"$/, async function (id, content, senderId, conversationId, createdAt) {
        const msg = await response.body.messages.find((msg:any) => msg.message.id === Number(id));
        expect(msg.message).toBeTruthy();
        expect(msg.message.content).toBe(content);
        expect(msg.message.senderId).toBe(Number(senderId));
        expect(msg.message.conversationId).toBe(Number(conversationId));
      });
    };

    const senderInfoContains = ({then}) => {
      then(/^a lista de mensagens deve conter name "(.*)" e userPicture "(.*)"$/, async function (name, userPicture) {
        mockInfo = {
          name: name == 'null' ? null : name,
          userPicture: userPicture == 'null' ? null : userPicture
        }
        const message = await response.body.messages.find((msg) => msg.senderInfo.name === name);
        expect(message).toBeTruthy();
        expect(message.senderInfo.name).toBe(mockInfo.name);
        expect(message.senderInfo.userPicture).toBe(mockInfo.userPicture);
      });
    }

  test('Visualizar mensagens em uma conversa', ({ given, when, then }) => {
    givenSteps({ given });
    requisition({ when });
    
    requisitionStatus({ then });
    checkJsonSteps({ then });
    listContainsMessages({ then });
    senderInfoContains({ then });
    listContainsMessages({ then });
    senderInfoContains({ then });
    listContainsMessages({ then });
    senderInfoContains({ then });
    listContainsMessages({ then });
    senderInfoContains({ then });
    listContainsMessages({ then });
    senderInfoContains({ then });
  });
});
