import { UserRepository } from '../services/UserRepository.js';
import { User } from '../entities/User.js'; 


export class CreateUser {
  constructor(private userRepo: UserRepository) {}

   async execute(name: string, password: string, email: string): Promise<User> {
    const user = new User(null, name, password, email); 
    const createdUser = await this.userRepo.create(user); 
    return createdUser;
  }
}
