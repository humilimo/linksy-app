import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { ErasedMessageController } from '../../src/erased-message/erased-message.controller';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ErasedMessageService } from '../../src/erased-message/erased-message.service';

const feature = loadFeature('tests/features/delete-message.feature');

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

  test('Mensagem excluída para todos(chat em grupo)', ({ given, then, when, and }) => {
    given(/^o grupo "grupoMari" de id "(.*)"  está na lista de conversa de Mari de id"(.*)"$/, async (chatId, userId) => {
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

    and(/^“grupoMari” de id "(.*)"está na lista de conversa de "Lucas" de id "(.*)"$/, async (chatId, userId) => {
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

    when(/^"Mari" de id"(.*)" seleciona “excluir para todos” na mensagem de id "(.*)" na coversa de id "(.*)"$/, async (userId,messageId, chatId) => {
      response = await request(app.getHttpServer())
        .delete(`/user/${userId}/conversation/${chatId}/deleteForAll/${messageId}`)
        .send();
      expect(response.status).toBe(200);
    });

    then(/^a mensagem de id "(.*)" é excluída  para todos do grupo “grupoMari”$/, async (messageId) => {
      const erasedMessage = await prismaService.message.findUnique({
        where: {
          id: Number(messageId),
        },
      });
      expect(erasedMessage).toBeNull();
      
    });
  });
});
