import { UserRepository } from '../services/UserRepository.js';
import { User } from '../entities/User.js';

export class UpdateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(id: number, name: string, email: string): Promise<void> {
    const existUser = await this.userRepo.getById(id)
    if (!existUser) throw new Error('Usuario no encontrado');
    const user = new User(id, name,existUser.password,email);
    await this.userRepo.update(user);
  }
}
