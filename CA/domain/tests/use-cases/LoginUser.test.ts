// tests/usecases/loginUser.test.ts
import { describe, it, expect, vi } from 'vitest';
import bcrypt from 'bcrypt';
import { LoginUser } from '../../src/use-cases/LoginUser';
import { User } from '../../src/entities/User';
import { UserRepository } from '../../src/services/UserRepository';

describe('LoginUser Use Case', () => {
  it('should login user with correct credentials', async () => {
  
    const plainPassword = 'test12';
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    
    const mockUser = new User(8, 'test', hashedPassword, 'test@test.com')

    
    const mockUserRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn().mockResolvedValue(mockUser),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    }

    const loginUser = new LoginUser(mockUserRepo)

    
    const result = await loginUser.execute('test@test.com', plainPassword)

  
    expect(result).toBeInstanceOf(User);
    expect(result.id).toBe(8);
    expect(result.name).toBe('test');
    expect(result.email).toBe('test@test.com')
  })

  it('should throw if password is incorrect', async () => {
    const hashedPassword = await bcrypt.hash('test12', 10)
    const mockUser = new User(8, 'test', hashedPassword, 'test@test.com')

    const mockUserRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn().mockResolvedValue(mockUser),
      getAll: vi.fn(),
      delete: vi.fn(),

      update: vi.fn(),
    }

    const loginUser = new LoginUser(mockUserRepo)

    await expect(loginUser.execute('test@test.com', 'wrongpassword')).rejects.toThrow('Contraseña incorrecta');
  })

  it('should throw if user is not found', async () => {
    const mockUserRepo: UserRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByEmail: vi.fn().mockResolvedValue(null),
      getAll: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    }

    const loginUser = new LoginUser(mockUserRepo)

    await expect(loginUser.execute('notfound@test.com', 'password')).rejects.toThrow('Usuario no encontrado')
  })
})
