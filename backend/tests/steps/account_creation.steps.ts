import { UserService } from '../../src/user/user.service';
import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { UserController } from '../../src/user/user.controller';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const feature = loadFeature('tests/features/account_creation.feature');

defineFeature(feature, (test) => {

    let prismaService: PrismaService;
    let userService: UserService;
    let testingModule: TestingModule;
    let mockUser: any;
    let user: any
    let app: INestApplication;
    let response: any
  
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
  
    test('Cadastro com sucesso', async ({ given, when, and, then }) => {
      given('O usuário quer realizar um cadastro no sistema', async () => {
        
      });

      when(/^uma requisição POST com um JSON com name "(.*)", username "(.*)", email "(.*)", password "(.*)" de corpo$/, async (name, username, email, password) => {

        mockUser = {
            name: name,
            username: username,
            email: email,
            password: password,
        };

      });

      and('esta requisição for enviada para "user/register"', async () => {

        response = await request(app.getHttpServer())
            .post('/user/register')
            .send(mockUser);

      });

      then(/^o status da resposta deve ser "(.*)"$/, async (status) => {

        expect(response.status).toBe(Number(status)); // Verifica se o status da resposta é 201
        user = response.body;

      });

      and(/^o JSON da resposta deve conter id "(.*)", name "(.*)", username "(.*)", email "(.*)", password "(.*)", bio "(.*)", picture "(.*)"$/, async (id, name, username, email, password, bio, picture) => {

        const expectedUser = {
            id: Number(id),
            name: name,
            username: username,
            email: email,
            password: password,
            bio: bio == "null"? null : bio,
            picture: picture == "null"? null : picture
        };

        expect(user).toEqual(expectedUser);

      });

    });

    test('Cadastro sem sucesso por senha pequena demais', async ({ given, when, and, then }) => {
        
        given('O usuário quer realizar um cadastro no sistema', async () => {
        
        });

        when(/^uma requisição POST com um JSON com name "(.*)", username "(.*)", email "(.*)", password "(.*)" de corpo$/, async (name, username, email, password) => {

            mockUser = {
                name: name,
                username: username,
                email: email,
                password: password,
            };
    
        });

        and('esta requisição for enviada para "user/register"', async () => {

            response = await request(app.getHttpServer())
                .post('/user/register')
                .send(mockUser);
    
        });

        then(/^o status da resposta deve ser "(.*)"$/, async (status) => {

            expect(response.status).toBe(Number(status)); // Verifica se o status da resposta é 201
    
        });

        and(/^o JSON deve conter message "(.*)"$/, async (message) => {
    
            expect(response.body.message).toEqual([message]);
    
        });
  
    });

    test('Cadastro sem sucesso por falta de username', async ({ given, when, and, then }) => {
        
        given('O usuário quer realizar um cadastro no sistema', async () => {
        
        });

        when(/^uma requisição POST com um JSON com name "(.*)", email "(.*)", password "(.*)" de corpo$/, async (name, email, password) => {

            mockUser = {
                name: name,
                email: email,
                password: password,
            };
    
        });

        and('esta requisição for enviada para "user/register"', async () => {

            response = await request(app.getHttpServer())
                .post('/user/register')
                .send(mockUser);
    
        });

        then(/^o status da resposta deve ser "(.*)"$/, async (status) => {

            expect(response.status).toBe(Number(status)); // Verifica se o status da resposta é 201
    
        });

        and(/^o JSON deve conter message "(.*)"$/, async (message) => {
    
            expect(response.body.message).toEqual([message]);
    
        });
  
    });

  });
  
