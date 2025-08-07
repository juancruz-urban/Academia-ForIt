export class User {
  constructor(
    public id: number | null,
    public name: string,
    public password:string,
    public email: string
  ) {}
}

export type UserDTO = Omit<User, 'password'>;

