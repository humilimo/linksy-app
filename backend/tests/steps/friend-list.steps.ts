import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { FriendController } from '../../src/friend/friend.controller';
import { FriendService } from '../../src/friend/friend.service';

const feature = loadFeature('tests/features/friend-list.feature');

defineFeature(feature, (test) => {
    let testingModule: TestingModule;
    let prismaService: PrismaService;
    let app: INestApplication;
    let friendService: FriendService;
    let response: any;
    let request_json: any;
  
    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
                controllers: [FriendController],
                providers: [PrismaService, FriendService]
        }).compile();
          
    prismaService = testingModule.get<PrismaService>(PrismaService);
    friendService = testingModule.get<FriendService>(FriendService);
    
    app = testingModule.createNestApplication();
    await app.init();
          
    });
  
    afterAll(async () => {
        await testingModule.close();
        await app.close();
    });

    test('Adicionar um usuário válido como contato', async ({ given, then, when, and }) => {
        
        given(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        when(/^o corpo da requisição é um JSON com username "(.*)"$/, async function (username) {
            request_json = {
                "username": username,
            };
        });

        and(/^uma requisição "POST" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).post(route).send(request_json);
        });
        
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        });

        and(/^o JSON da resposta deve conter requesterId "(.*)"$/, async function (requesterId) {
            expect(response.body.requesterId).toBe(Number(requesterId));
        });

        and(/^o JSON da resposta deve conter receiverId "(.*)"$/, async function (receiverId) {
            expect(response.body.receiverId).toBe(Number(receiverId));
        });
	
    })

    test('Adicionar como contato um usuário inválido', async ({ given, then, when, and }) => {
        
        given(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^não existe um user com username "(.*)"$/, async (username) => {
            const user = await prismaService.user.findUnique({
                where: {
                    username: username
                }
            })
            expect(user).toBeNull();
        });

        when(/^o corpo da requisição é um JSON com username "(.*)"$/, async function (username) {
            request_json = {
                "username": username,
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

    test('Excluir um contato', async ({ given, then, when, and }) => {
        
        given(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^existe um friend de requesterId "(.*)" e receiverId "(.*)"$/, async (requesterId, receiverId) => {
            const friend = await prismaService.friend.findUnique({
              where: {
                 requesterId_receiverId:{
                    requesterId: Number(requesterId),
                    receiverId: Number(receiverId)
                 }
              }
            })
            expect(friend).not.toBeNull();
        });

        and(/^o corpo da requisição é um JSON com username "(.*)"$/, async function (username) {
            request_json = {
                "username": username,
            };
        });

        when(/^uma requisição "DELETE" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).delete(route).send(request_json);
        });
        
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        });

        and(/^o JSON da resposta deve conter requesterId "(.*)"$/, async function (requesterId) {
            expect(response.body.requesterId).toBe(Number(requesterId));
        });

        and(/^o JSON da resposta deve conter receiverId "(.*)"$/, async function (receiverId) {
            expect(response.body.receiverId).toBe(Number(receiverId));
        });
	
    })

    test('Visualizar lista de contatos', async ({ given, then, when, and }) => {
        
        given(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^existe um user com id "(.*)" e username "(.*)"$/, async (id, username) => {
            const user = await prismaService.user.findUnique({
              where: {
                id: Number(id),
                username: username
              }
            })
            expect(user).not.toBeNull();
        });

        and(/^existe um friend de requesterId "(.*)" e receiverId "(.*)"$/, async (requesterId, receiverId) => {
            const friend = await prismaService.friend.findUnique({
                where: { 
                    requesterId_receiverId: {
                        requesterId: Number(requesterId),
                        receiverId: Number(receiverId)
                    }
                }
            })
            expect(friend).not.toBeNull();
        });

        and(/^existe um friend de requesterId "(.*)" e receiverId "(.*)"$/, async (requesterId, receiverId) => {
            const friend = await prismaService.friend.findUnique({
                where: { 
                    requesterId_receiverId: {
                        requesterId: Number(requesterId),
                        receiverId: Number(receiverId)
                    }
                }
            })
            expect(friend).not.toBeNull();
        }); 

        when(/^uma requisição "GET" for enviada para "(.*)"$/, async function (route) {
            response = await request(app.getHttpServer()).get(route);
        });
        
        then(/^o status da resposta deve ser "(.*)"$/, async function (status) {
            expect(response.status).toBe(Number(status));
        });

        and(/^o JSON da resposta deve conter o array de objetos friendList$/, async function () {
            expect(response.body.friendList).toBeDefined();
        });

        and(/^o array friendList deve conter o objeto {id: "(.*)", username: "(.*)", name: "(.*)", bio: "(.*)", picture: "(.*)"}$/, async function (id,username,name,bio,picture) {
            const expectedObject = {
                "id" : Number(id),
                "username" : username,
                "name" : name,
                "bio" : bio == "null" ? null : bio,
                "picture" : picture == "null" ? null : picture, 
                }; // Converta a string JSON em um objeto JavaScript

            expect(response.body.friendList).toContainEqual(expectedObject);
        });
        
        and(/^o array friendList deve conter o objeto {id: "(.*)", username: "(.*)", name: "(.*)", bio: "(.*)", picture: "(.*)"}$/, async function (id,username,name,bio,picture) {
            const expectedObject = {
                "id" : Number(id),
                "username" : username,
                "name" : name,
                "bio" : bio == "null" ? null : bio,
                "picture" : picture == "null" ? null : picture, 
                }; // Converta a string JSON em um objeto JavaScript
                
            expect(response.body.friendList).toContainEqual(expectedObject);
        });
        
    })

})
