import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from '../../commands/handlers';
import { QueryHandlers } from '../../queries/handlers';
import { UsersModule } from '../../users.module';
import * as request from 'supertest';

// eslint-disable-next-line max-len
// TODO: Try out this SO answer for e2e testing https://stackoverflow.com/questions/57695246/unit-and-e2e-testing-with-nestjs-typeorm-on-mysql-and-passport-module

// TODO: Try out this SO answer for unit testing https://stackoverflow.com/questions/55567053/test-nestjs-service-with-jest

describe('CreateUserHandler', () => {
  let app: INestApplication;
  const usersService = { findAll: () => [] };

  beforeAll(async () => {
    // Referred to this article for setting up the test architecture https://medium.com/@salmon.3e/integration-testing-with-nestjs-and-typeorm-2ac3f77e7628
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5432,
          username: 'postgres',
          password: 'mypassword',
          database: 'postgres',
          // entities: ['src/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
