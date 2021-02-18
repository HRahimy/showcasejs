export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}
