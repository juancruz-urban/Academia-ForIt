import { User } from '../entities/User';

export interface UserRepository {
  create(user: User): Promise<User>;
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  delete(id: number): Promise<void>;
  update(user: User): Promise<void>;
}
