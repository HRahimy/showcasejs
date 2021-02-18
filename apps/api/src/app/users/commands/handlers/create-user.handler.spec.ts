import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiCqrsControllers } from '../../users.controller';
import { CreateUserHandler } from './create-user.handler';
import { UserEntity } from '../../entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../entities';
import { CommandHandlers } from '../../commands/handlers';
import { QueryHandlers } from '../../queries/handlers';

// eslint-disable-next-line max-len
// TODO: Try out this SO answer for e2e testing https://stackoverflow.com/questions/57695246/unit-and-e2e-testing-with-nestjs-typeorm-on-mysql-and-passport-module

// TODO: Try out this SO answer for unit testing https://stackoverflow.com/questions/55567053/test-nestjs-service-with-jest

describe('CreateUserHandler', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CqrsModule,
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
        }),
        TypeOrmModule.forFeature([...entities]),
      ],
      controllers: [...ApiCqrsControllers],
      providers: [...CommandHandlers, ...QueryHandlers],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200);
    // .expect({
    //   data: catsService.findAll(),
    // });
  });
});
