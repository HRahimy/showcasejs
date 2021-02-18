import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';
import { CreateUserCommand } from '../impl/create-user.command';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { PhotoEntity } from '../../entities/photo.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

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

    /**
     * Necessary to await this save command in order to catch query failure
     * and throw appropriate error in response.
     * Reference:
     * https://stackoverflow.com/a/61138011/5472560
     */
    await this.userRepository.save(userEntity).catch((err) => {
      throw new InternalServerErrorException(
        `CreateUserCommand(${command}) failed with error(${err})`
      );
    });

    console.log(userEntity);

    const user = new User(
      userEntity.id,
      userEntity.name,
      userEntity.description
    );
    return user;
  }
}
