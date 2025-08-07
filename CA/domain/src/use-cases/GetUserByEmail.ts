import { User } from "../entities/User";
import { UserRepository } from "../services/UserRepository";

export class GetUserByEmail{

    constructor(private userRepo:UserRepository){}

    async execute(email: string) {
    return this.userRepo.getByEmail(email);
  }
}