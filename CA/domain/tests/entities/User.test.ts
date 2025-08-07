// tests/domain/entities/User.test.ts
import { describe, it, expect } from 'vitest'
import { User } from '../../src/entities/User'

describe('User entity', () => {
  it('should create a user with correct properties', () => {
    const user = new User(1, 'Juan', '1234', 'juan@example.com')

    expect(user.id).toBe(1)
    expect(user.name).toBe('Juan')
    expect(user.password).toBe('1234')
    expect(user.email).toBe('juan@example.com')
  })
})