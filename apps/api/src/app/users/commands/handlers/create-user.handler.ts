import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';
import { CreateUserCommand } from '../impl/create-user.command';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { PhotoEntity } from '../../entities/photo.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { name, description } = command;
    const userEntity = new UserEntity(uuidv4(), name, description, [
      new PhotoEntity(`test photo name ${uuidv4()}`),
    ]);
    console.log(userEntity);
    this.userRepository.save(userEntity);

    const user = new User(
      userEntity.id,
      userEntity.name,
      userEntity.description
    );

    return user;
  }
}
