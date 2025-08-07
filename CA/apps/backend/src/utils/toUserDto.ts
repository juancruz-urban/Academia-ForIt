import { User } from '../../../../domain/src/entities/User';
import { UserDTO } from '../types/UserDTO';

export function toUserDto(user: User): UserDTO {
  const { password, ...safeUser } = user;
  return safeUser;
}
