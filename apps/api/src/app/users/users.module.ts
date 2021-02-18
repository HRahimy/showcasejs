import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './users.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...entities])],
  controllers: [UserController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class UsersModule {}
