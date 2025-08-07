import { GetUserByEmail } from '../../src/use-cases/GetUserByEmail';
import { describe, it, expect, vi } from 'vitest';
import { UserRepository } from '../../src/services/UserRepository';
import { User } from '../../src/entities/User';

describe('GetUserByEmail', () => {
  it('should return user for valid email', async () => {
    const user = new User(1, 'Juan', '1234', 'juan@example.com');

    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn().mockResolvedValue(user),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const getUserByEmail = new GetUserByEmail(userRepo);

    const result = await getUserByEmail.execute('juan@example.com');

    expect(result).toEqual(user);
  });

  it('should return null if email not found', async () => {
    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn().mockResolvedValue(null),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const getUserByEmail = new GetUserByEmail(userRepo);

    const result = await getUserByEmail.execute('notfound@example.com');

    expect(result).toBeNull();
  });
});
