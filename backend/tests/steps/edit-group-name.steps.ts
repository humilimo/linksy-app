// Importações
import { ConversationService } from '../../src/conversation/conversation.service';
import { ConversationController } from '../../src/conversation/conversation.controller';
import { MessageService } from '../../src/message/message.service';
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';
import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

const feature = loadFeature('tests/features/edit-group-name.feature');

defineFeature(feature, (test) => {
  let prismaService: PrismaService;
  let conversationService: ConversationService;
  let testingModule: TestingModule;
  let app: INestApplication;
  let response: request.Response

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [
        ConversationService,
        MessageService,
        UserConversationService,
        PrismaService,
      ],
    }).compile();

    prismaService = testingModule.get<PrismaService>(PrismaService);
    conversationService = testingModule.get<ConversationService>(ConversationService);

    app = testingModule.createNestApplication()
    await app.init()
  });

  afterAll(async () => {
    await testingModule.close();

  });

  test('dono do grupo altera o nome do grupo', async ({ given, then, when, and }) => {
    given(/^existe um usuário de id "(.*)" e username "(.*)"$/, async (id, username) => {
      const user = await prismaService.user.findUnique({
        where: {
          id: Number(id),
          username: username
        }
      })
      expect(user).not.toBeNull();
    });
    and(/^existe uma conversation de id "(.*)" e nome "(.*)"$/, async (id, name) => {
      const conversation = await prismaService.conversation.findUnique({
        where: {
          id: Number(id),
          name: name
        }
      })
      expect(conversation).not.toBeNull();
    });
    and(/^existe um user conversation de idUser "(.*)", idConversation "(.*) e owner "(.*)"$/, async (idUser, idConversation, owner) => {
      const conversation = await prismaService.userConversation.findUnique({
        where: {
          userId_conversationId:{
            conversationId: parseInt(idConversation, 10),
            userId: Number(idUser)
          },
          owner: (owner === 'true')
        }
      })
      expect(conversation).not.toBeNull();
    });
    when(/^uma requisição "(.*)" for enviada para "(.*)" com o corpo sendo um JSON com name "(.*)"$/, async (req, url, name) => {
      if (req == "PATCH") {
        response = await request(app.getHttpServer()).patch(url).send({
          name: name
        })
      }
    });
    then(/^o status de resposta deve ser "(.*)"$/, async (status) => {
      expect(response.status).toBe(parseInt(status, 10));
    });
    and(/^o JSON da resposta deve conter o newNameMessage "(.*)"$/, async (message) => {
      expect(response.body.newNameMessage).toBe(message);
    });
  });
});
