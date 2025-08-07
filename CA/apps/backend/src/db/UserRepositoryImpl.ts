import { User } from '../../../../domain/src/entities/User.js';
import { UserRepository } from '../../../../domain/src/services/UserRepository.js';
import { db } from '../config/db.js';
import bcrypt from 'bcrypt'



export class UserRepositoryImpl implements UserRepository {
 async create(user: User): Promise<User> {


  const hashedPassword = await bcrypt.hash(user.password, 10)
  const result = await db.execute({
  sql: `INSERT INTO users (name, password, email) VALUES (?, ?, ?)`,
  args: [user.name, hashedPassword, user.email],
});

const id = Number(result.lastInsertRowid); // ← forma correcta en SQLite/Turso
return new User(id, user.name, hashedPassword, user.email);
}


  async getById(id: number): Promise<User | null> {
    const result = await db.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const row = result.rows[0];

    return new User(
      Number(row.id), 
      row.name as string, 
      row.password as string, 
      row.email as string
    );
    
  }

  async getByEmail(email: string): Promise<User | null> {
     const result = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const row = result.rows[0];

    return new User(
      Number(row.id), 
      row.name as string, 
      row.password as string, 
      row.email as string
    );
  }

  async getAll(): Promise<User[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM users'
  });

  return result.rows.map((row) => 
    new User(
      Number(row.id),
      row.name as string,
      row.password as string,
      row.email as string
    )
  );
}


  async delete(id: number): Promise<void> {
    const result = await db.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
  }

  async update(user: User): Promise<void> {
  await db.execute({
    sql: `
      UPDATE users
      SET name = ?, password = ?, email = ?
      WHERE id = ?
    `,
    args: [user.name, user.password, user.email, user.id],
  });
}

}
