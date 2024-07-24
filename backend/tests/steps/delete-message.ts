import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { ErasedMessageController } from '../../src/erased-message/erased-message.controller';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ErasedMessageService } from '../../src/erased-message/erased-message.service';

const feature = loadFeature('tests/features/account_creation.feature');

defineFeature(feature, (test) => {
  let prismaService: PrismaService;
  let erasedMessageService: ErasedMessageService;
  let testingModule: TestingModule;
  let app: INestApplication;
  let response: any;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [ErasedMessageController],
      providers: [ErasedMessageService, PrismaService],
    }).compile();

    prismaService = testingModule.get<PrismaService>(PrismaService);
    erasedMessageService = testingModule.get<ErasedMessageService>(ErasedMessageService);
    app = testingModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await testingModule.close();
    await app.close();
  });

  test('Mensagem excluída para todos (chat em grupo)', ({ given, then, when, and }) => {
    given(/^o grupo "(.*)" está na lista de conversas de "paçoca" com userId "(.*)"$/, async (chatId, userId) => {
      const userConversation = await prismaService.userConversation.findUnique({
        where: {
          userId_conversationId: {
            userId: Number(userId),
            conversationId: Number(chatId),
          },
        },
      });
      expect(userConversation).not.toBeNull();
    });

    and(/^existe uma mensagem de id "(.*)"$/, async (messageId) => {
      const msg = await prismaService.message.findUnique({
        where: { id: Number(messageId) },
      });
      expect(msg).not.toBeNull();
    });

    when(/^"(.*)"  seleciona "excluir para todos" na mensagem de id "(.*)" na conversa de id "(.*)"$/, async (userId,messageId, chatId) => {
      response = await request(app.getHttpServer())
        .patch(`/user/${userId}/conversation/${chatId}/apagarMensagemParaTodos/${messageId}`)
        .send();
      expect(response.status).toBe(200);
    });

    then(/^a mensagem é excluída para todos do grupo "(.*)"$/, async (chatId) => {
      const erasedMessages = await prismaService.erasedMessages.findMany({
        where: {
          chatId: Number(chatId),
        },
      });
      expect(erasedMessages.length).toBeGreaterThan(0);
      expect(erasedMessages.find(msg => msg.messageId === Number(response.body.messageId))).toBeUndefined();
    });
  });
});
