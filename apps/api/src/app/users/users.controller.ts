import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { CreateUserDto } from './interfaces/create-user-dto.interface';
import { User } from './models/user.model';
import { GetUserQuery, GetUsersQuery } from './queries/impl';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(dto.name, dto.description)
    );
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.queryBus.execute(new GetUserQuery(id));
  }
}
