import { describe, it, expect, vi } from 'vitest';
import { DeleteUser } from '../../src/use-cases/DeleteUser';
import { UserRepository } from '../../src/services/UserRepository';

describe('DeleteUser', () => {
  it('deberia eliminar un usuario', async () => {
    const userRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn(),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const deleteUser = new DeleteUser(userRepo)

    await deleteUser.execute(1)

    expect(userRepo.delete).toHaveBeenCalledWith(1)
  });
});
