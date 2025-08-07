
import { User } from "../entities/User"
import { UserRepository } from "../services/UserRepository"
import bcrypt from 'bcrypt'

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User> {

    if(!email) throw new Error('Falta email')
    if(!password) throw new Error('Falta password')
    const user = await this.userRepository.getByEmail(email)
    if (!user) throw new Error('Usuario no encontrado')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Contraseña incorrecta')

    return user
  }
}