// Importações
import { UserService } from '../../src/user/user.service';
import { PrismaService } from '../../src/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('tests/features/example.feature');

defineFeature(feature, (test) => {
  let prismaService: PrismaService;
  let userService: UserService;
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
      ],
    }).compile();

    prismaService = testingModule.get<PrismaService>(PrismaService);
    userService = testingModule.get<UserService>(UserService);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  test('Entering a correct password', async ({ given }) => {
    given('I have previously created a password', async () => {
      let mockUser = {
          id: 0,
          name: 'linksy',
          username: 'linksy',
          bio: null,
          picture: null,
      };
      const user = await userService.findOne(mockUser.id);
      expect(user).toEqual(mockUser);
    });
  });
});
