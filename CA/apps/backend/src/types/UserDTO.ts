import { User } from '../../../../domain/src/entities/User';

export type UserDTO = Omit<User, 'password'>;
