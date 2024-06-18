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
    let friendId: any
  
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
      });

      when(/^uma requisição PATCH com um JSON com name "(.*)" de corpo$/, async (name) => {
        mockUser = {
            name: name
        };
      });

      and('esta requisição for enviada para "user/2/profile"', async () => {
        response = await request(app.getHttpServer())
            .patch(`/user/${userId}/profile`)
            .send(mockUser);
      });

      then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
        expect(response.status).toBe(Number(status));
      });

      and(/^o JSON da resposta deve conter id "(.*)", name "(.*)", username "(.*)", email "(.*)", password "(.*)", bio "(.*)" e picture "(.*)"$/, async (id, name, username, email, password, bio, picture) => {
        let user = {
          "id": Number(id),
          "name": name,
          "username": username,
          "email": email,
          "password": password,
          "bio": bio == "null"? null : bio,
          "picture": picture == "null"? null : picture
        }

        expect(response.body).toEqual(user)
      });

    });


    test('Edição de email sem sucesso', async ({ given, when, and, then }) => {
      given(/^existe um user com id "(.*)"$/, async (id) => {
        userId = id
      });

      when(/^uma requisição PATCH com um JSON com email "(.*)" de corpo$/, async (email) => {
        mockUser = {
            email: email
        };
      });

      and('esta requisição for enviada para "user/2/profile"', async () => {
        response = await request(app.getHttpServer())
            .patch(`/user/${userId}/profile`)
            .send(mockUser);
      });

      then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
        expect(response.status).toBe(Number(status));
      });

      and(/^o JSON deve conter message "(.*)" e error "(.*)"$/, async (message, error) => {
        expect(response.body.message).toEqual(message);
        expect(response.body.error).toEqual(error)
      });

    });


    test('Visualização do próprio perfil', async ({ given, when, and, then }) => {
      given(/^existe um user com id "(.*)"$/, async (id) => {
        userId = id
      });

      when('uma requisição GET foi enviada para "user/3/profile"', async () => {
        response = await request(app.getHttpServer())
            .get(`/user/${userId}/profile`)
      });

      then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
        expect(response.status).toBe(Number(status));
      });

      and(/^o JSON da resposta deve conter id "(.*)", name "(.*)", username "(.*)", bio "(.*)" e picture "(.*)"$/, async (id, name, username, bio, picture) => {
        let user = {
          "id": Number(id),
          "name": name,
          "username": username,
          "bio": bio == "null"? null : bio,
          "picture": picture == "null"? null : picture
        }

        expect(response.body).toEqual(user)

      });

    });

    test('Visualização do perfil de um amigo', async ({ given, when, and, then }) => {
      given(/^existe um user com id "(.*)" que quer ver o perfil do seu amigo de id "(.*)"$/, async (loggedId, id) => {
        userId = loggedId
        friendId = id
      });

      when('uma requisição GET foi enviada para "user/2/profile/3"', async () => {
        response = await request(app.getHttpServer())
            .get(`/user/${userId}/profile/${friendId}`)
      });

      then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
        expect(response.status).toBe(Number(status));
      });

      and(/^o JSON da resposta deve conter id "(.*)", name "(.*)", username "(.*)", bio "(.*)" e picture "(.*)"$/, async (id, name, username, bio, picture) => {
        let user = {
          "id": Number(id),
          "name": name,
          "username": username,
          "bio": bio == "null"? null : bio,
          "picture": picture == "null"? null : picture
        }

        expect(response.body).toEqual(user)
      });

    });

  });