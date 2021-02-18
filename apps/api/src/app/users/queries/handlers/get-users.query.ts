import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { User } from '../../models/user.model';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<User[]> {
    const entities = await this.userRepository.find().catch((err) => {
      throw new InternalServerErrorException(
        `GetUsersQuery(${query}) failed with error(${err})`
      );
    });
    const users = entities.map((userEntity) => {
      return new User(userEntity.id, userEntity.name, userEntity.description);
    });

    return users;
  }
}
