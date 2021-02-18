import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { User } from '../../models/user.model';
import { GetUserQuery } from '../impl';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async execute(query: GetUserQuery): Promise<User> {
    const entity = await this.userRepository.findOne({id: query.id});
    return new User(entity.id, entity.name, entity.description);
  }
}
