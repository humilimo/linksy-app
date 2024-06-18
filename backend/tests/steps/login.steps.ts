import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { ConversationService } from '../../src/conversation/conversation.service';
import { MessageService } from '../../src/message/message.service';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { UserConversationService } from '../../src/user-conversation/user-conversation.service';

const feature = loadFeature('tests/features/login.feature');

defineFeature(feature, (test) => {
    let testingModule: TestingModule;
    let prismaService: PrismaService;
    let app: INestApplication;
    let userService: UserService;
    let response: any;
    let request_json: any;
  
    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
                controllers: [UserController],
                providers: [PrismaService, UserService, ConversationService, UserConversationService, MessageService]
        }).compile();
          
    prismaService = testingModule.get<PrismaService>(PrismaService);
    userService = testingModule.get<UserService>(UserService);
    
    app = testingModule.createNestApplication();
    //await app.listen(3002);
    await app.init();
    
    });
  
    afterAll(async () => {
        await testingModule.close();
        await app.close();
    });

    test('Login com credenciais válidas', async ({ given, then, when, and }) => {
        
        given(/^existe um user com id "(.*)", username "(.*)", e password "(.*)"$/, async (id, username, password) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username,
                password: password
              }
            })
            expect(user).not.toBeNull();
        });

        when(/^o corpo da requisição é um JSON com username "(.*)" e password "(.*)"$/, async function (username, password) {
            request_json = {
                "username": username,
                "password": password
            };
        });

        and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).post(route).send(request_json);
        });
        
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        }); 

        and(/^o JSON da resposta deve conter auth "(.*)"$/, async function (auth) {
            expect(response.body.auth).toBe(Boolean(auth));
        });

       and(/^o JSON da resposta deve conter token válido$/, async function () {
            expect(response.body.token).toBeDefined();
            expect(typeof response.body.token).toBe('string');
        }); 
	
    })

    test('Login com senha inválida', async ({ given, then, when, and }) => {
        
        given(/^existe um user com id "(.*)", username "(.*)", e password "(.*)"$/, async (id, username, password) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username,
                password: password
              }
            })
            expect(user).not.toBeNull();
        });

        when(/^o corpo da requisição é um JSON com username "(.*)" e password "(.*)"$/, async function (username, password) {
            request_json = {
                "username": username,
                "password": password
            };
        });

        and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).post(route).send(request_json);
        });
        
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        });

        and(/^o JSON da resposta deve conter message "(.*)"$/, async function (message) {
            expect(response.body.message).toBe(message);
        });
	
    })

    test('Login com usuário não cadastrado', async ({ given, then, when, and }) => {
        
        given(/^não existe um user com username "(.*)"$/, async (username) => {
            const user = await prismaService.user.findUnique({
              where: {
                username: username,
              }
            })
            expect(user).toBeNull();
        });

        when(/^o corpo da requisição é um JSON com username "(.*)" e password "(.*)"$/, async function (username, password) {
            request_json = {
                "username": username,
                "password": password
            };
        });

        and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).post(route).send(request_json);
        });
        
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        });

        and(/^o JSON da resposta deve conter message "(.*)"$/, async function (message) {
            expect(response.body.message).toBe(message);
        });
	
    })

})
