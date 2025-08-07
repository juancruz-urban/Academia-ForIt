import { UserRepository } from '../services/UserRepository.js';

export class GetUserById {
  constructor(private userRepo: UserRepository) {}

  async execute(id: number) {
    return this.userRepo.getById(id);
  }
}
