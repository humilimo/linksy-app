// Importações
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';
import { UserConversationController } from '../../src/user-conversation/user-conversation.controller';
import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

const feature = loadFeature('tests/features/leave-conversation.feature');

defineFeature(feature, (test) => {
  let prismaService: PrismaService;
  let userConversationService: UserConversationService;
  let testingModule: TestingModule;
  let app: INestApplication;
  let response: request.Response

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [UserConversationController],
      providers: [
        UserConversationService,
        PrismaService,
      ],
    }).compile();

    prismaService = testingModule.get<PrismaService>(PrismaService);
    userConversationService = testingModule.get<UserConversationService>(UserConversationService);

    app = testingModule.createNestApplication()
    await app.init()
  });

  afterAll(async () => {
    await testingModule.close();

  });

  test('usuário sai de um grupo', async ({ given, then, when, and }) => {
    given(/^existe um usuário de id "(.*)" e username "(.*)"$/, async (id, username) => {
      const user = await prismaService.user.findUnique({
        where: {
          id: Number(id),
          username: username
        }
      })
      expect(user).not.toBeNull();
    });
    and(/^existe uma conversation de id "(.*)"$/, async (id) => {
      const conversation = await prismaService.conversation.findUnique({
        where: {
          id: Number(id)
        }
      })
      expect(conversation).not.toBeNull();
    });
    and(/^existe um user conversation de idUser "(.*)", idConversation "(.*), owner "(.*)" e leftConversation "(.*)"$/, async (idUser, idConversation, owner, leftConversation) => {
      const conversation = await prismaService.userConversation.findUnique({
        where: {
          userId_conversationId:{
            conversationId: parseInt(idConversation, 10),
            userId: Number(idUser)
          },
          leftConversation: (leftConversation === 'true'),
          owner: (owner === 'true')
        }
      })
      expect(conversation).not.toBeNull();
    });
    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (req, url) => {
      if (req == "PATCH") {
        response = await request(app.getHttpServer()).patch(url)
      }
    });
    then(/^o status de resposta deve ser "(.*)"$/, async (status) => {
      expect(response.status).toBe(parseInt(status, 10));
    });
    and(/^o JSON da resposta deve conter o content "(.*)"$/, async (message) => {
      expect(response.body.content).toBe(message);
    });
  });
});
