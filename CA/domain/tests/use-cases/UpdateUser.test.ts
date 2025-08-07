import { describe, it, expect, vi } from 'vitest';
import { UpdateUser } from '../../src/use-cases/UpdateUser';
import { User } from '../../src/entities/User';
import { UserRepository} from '../../src/services/UserRepository';

describe('UpdateUser', () => {
  it('should call update on repository with the user object', async () => {
    const user = new User(1, 'Juan', '1234', 'juan@example.com');

    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn(),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const updateUser = new UpdateUser(userRepo);

    await updateUser.execute(1, user.name, user.email);

    expect(userRepo.update).toHaveBeenCalledWith(user);
  });
});
