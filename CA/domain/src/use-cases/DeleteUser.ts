import { UserRepository } from '../services/UserRepository.js';

export class DeleteUser {
  constructor(private userRepo: UserRepository) {}

  async execute(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
