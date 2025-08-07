import { describe, it, expect, vi } from 'vitest';
import { GetUserById } from '../../src/use-cases/GetUserById';
import { User } from '../../src/entities/User';
import { UserRepository } from '../../src/services/UserRepository';

describe('GetUserById', () => {
  it('should return the user for a valid ID', async () => {
    const user = new User(1, 'Juan', '1234', 'juan@example.com');

    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn().mockResolvedValue(user),
      getByEmail: vi.fn(),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const getUserById = new GetUserById(userRepo);

    const result = await getUserById.execute(1);

    expect(result).toEqual(user);
  });

  it('should return null if user not found', async () => {
    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn().mockResolvedValue(null),
      getByEmail: vi.fn(),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const getUserById = new GetUserById(userRepo);

    const result = await getUserById.execute(999);

    expect(result).toBeNull();
  });
});
