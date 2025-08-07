import { Request, Response,NextFunction  } from 'express';
import { CreateUser } from '../../../../domain/src/use-cases/CreateUser';
import { GetUserById } from '../../../../domain/src/use-cases/GetUserById';
import { GetUserByEmail } from '../../../../domain/src/use-cases/GetUserByEmail';
import { GetAllUsers } from '../../../../domain/src/use-cases/GetAllUsers';
import { DeleteUser } from '../../../../domain/src/use-cases/DeleteUser';
import { UpdateUser } from '../../../../domain/src/use-cases/UpdateUser';
import { LoginUser } from '../../../../domain/src/use-cases/LoginUser';
import { toUserDto } from '../utils/toUserDto.js';
import { UserDTO } from '../../../../domain/src/entities/User.js';


export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUserById: GetUserById,
    private getUserByEmail : GetUserByEmail,
    private getAllUsers: GetAllUsers,
    private deleteUser: DeleteUser,
    private updateUser: UpdateUser,
    private loginUser: LoginUser
  ) {}

  create = async (req: Request, res: Response) => {
    const { name,password ,email } = req.body;
    const user = await this.createUser.execute(name, password,email);
    res.status(201).json(user);
  };
  login = async (req:Request, res:Response)=>{
     const {password ,email } = req.body;
    const user = await this.loginUser.execute(email, password);
    res.status(201).json(user);
 
  }

  getById = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const user = await this.getUserById.execute(Number(req.params.id));
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      const safeUser: UserDTO = toUserDto(user);
      res.json(safeUser);
     
    } catch (err) {
      next(err);
    }
  };


getByEmail = async(req:Request, res:Response, next:NextFunction)=>{
 try{ const user = await this.getUserByEmail.execute(req.params.email);
   if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      const safeUser: UserDTO = toUserDto(user);
      res.json(safeUser);
     
    } catch (err) {
      next(err);
    }
  }
  


  getAll = async (_: Request, res: Response) => {
  const users = await this.getAllUsers.execute();
  const safeUsers: UserDTO[] = users.map(toUserDto);
  res.json(safeUsers);
};


  delete = async (req: Request, res: Response) => {
    await this.deleteUser.execute(Number(req.params.id));
    res.status(204).send();
  };

  update = async (req: Request, res: Response) => {
    const { name,email } = req.body;
    await this.updateUser.execute(Number(req.params.id), name, email);
    res.status(204).send();
  };
}
