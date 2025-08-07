import { UserRepository } from '../services/UserRepository.js';

export class GetAllUsers {
  constructor(private userRepo: UserRepository) {}

  async execute() {
    return this.userRepo.getAll();
  }
}
