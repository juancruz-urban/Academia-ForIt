import { describe, it, expect, vi } from 'vitest';
import { CreateUser } from '../../src/use-cases/CreateUser';
import { UserRepository } from '../../src/services/UserRepository';
import { User } from '../../src/entities/User';

describe('CreateUser', () => {
  it('should create a new user', async () => {
    // Arrange
    const mockUser: User = new User(1, 'Juan', 'hashedpassword', 'juan@example.com');

    // Creamos el mock del repositorio
    const userRepo: UserRepository = {
      create: vi.fn().mockResolvedValue(mockUser),
      getById: vi.fn(),         // aunque no los uses, debes incluirlos
      getByEmail: vi.fn(),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn()
    };

    const createUser = new CreateUser(userRepo);

    // Act
    const result = await createUser.execute('Juan', 'hashedpassword', 'juan@example.com');

    // Assert
    expect(result).toEqual(mockUser);
    expect(userRepo.create).toHaveBeenCalledWith(expect.any(User));
  });
});
