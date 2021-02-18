import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(readonly id: string, readonly name: string = '', readonly description: string = '',) {
    super();
  }
}
