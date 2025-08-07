import { describe, it, expect, vi } from 'vitest';
import { GetAllUsers } from '../../src/use-cases/GetAllUsers';
import { UserRepository } from '../../src/services/UserRepository';
import { User } from '../../src/entities/User';

describe('GetAllUsers', () => {
  it('should return all users from repository', async () => {
    const users = [
      new User(1, 'Juan', '1234', 'juan@example.com'),
      new User(2, 'Maria', '5678', 'maria@example.com')
    ];

    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn(),
      getAll: vi.fn().mockResolvedValue(users),
      delete: vi.fn(),
      update: vi.fn()
    };

    const getAllUsers = new GetAllUsers(userRepo);

    const result = await getAllUsers.execute();

    expect(result).toEqual(users);
  });
});
