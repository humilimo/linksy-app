import { UserService } from '../../src/user/user.service';
import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { UserController } from '../../src/user/user.controller';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const feature = loadFeature('tests/features/profile.feature');

defineFeature(feature, (test) => {

    let prismaService: PrismaService;
    let userService: UserService;
    let testingModule: TestingModule;
    let mockUser: any;
    let app: INestApplication;
    let response: any
    let userId: any
  
    beforeAll(async () => {
      testingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          UserService,
          PrismaService,
        ],
      }).compile();
  
      prismaService = testingModule.get<PrismaService>(PrismaService);
      userService = testingModule.get<UserService>(UserService);
      app = testingModule.createNestApplication();
      app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
      await app.init();

    });
  
    afterAll(async () => {
      await testingModule.close();
      await app.close();
    });
  
    test('Edição de nome com sucesso', async ({ given, when, and, then }) => {
      given(/^existe um user com id "(.*)"$/, async (id) => {
        userId = id

        // await prismaService.user.create({
        //     data: {
        //       id: Number(userId),
        //       name: 'luis',
        //       username: 'luis',
        //       email: 'luis@email.com',
        //       password: '123456789',
        //     },
        //   });

      });

      when(/^uma requisição PATCH com um JSON com name "(.*)" de corpo$/, async (name) => {

        mockUser = {
            name: name
        };

      });

      and('esta requisição for enviada para "user/1/profile"', async () => {

        response = await request(app.getHttpServer())
            .patch(`/user/${userId}/profile`)
            .send(mockUser);

      });

      then(/^o status da resposta deve ser "(.*)"$/, async (status) => {

        expect(response.status).toBe(Number(status)); // Verifica se o status da resposta é 201
      });

    });

  });
  
