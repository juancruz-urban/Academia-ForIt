import express from 'express';
import { OrderRepositoryImpl } from './db/OrderRepositoryImpl.js';
import { CreateOrder } from '../../../domain/src/use-cases/CreateOrder.js';
import { OrderController } from './controllers/OrderController.js';
import cors from 'cors'


import { UserRepositoryImpl } from './db/UserRepositoryImpl.js';
import { CreateUser } from '../../../domain/src/use-cases/CreateUser.js';
import { GetUserById } from '../../../domain/src/use-cases/GetUserById.js';
import { GetUserByEmail } from '../../../domain/src/use-cases/GetUserByEmail.js';
import { GetAllUsers } from '../../../domain/src/use-cases/GetAllUsers.js';
import { DeleteUser } from '../../../domain/src/use-cases/DeleteUser.js';
import { UpdateUser } from '../../../domain/src/use-cases/UpdateUser.js';
import { LoginUser } from '../../../domain/src/use-cases/LoginUser.js';
import { UserController } from './controllers/UserController.js';



const app = express();
app.use(cors({origin:'*'}))
app.use(express.json());


///////////////   ORDERS  //////////////////
const orderRepo = new OrderRepositoryImpl();
const createOrder = new CreateOrder(orderRepo);
const orderController = new OrderController(createOrder);



///////////////   USERS  ////////////////
const userRepo = new UserRepositoryImpl();
const userController = new UserController(
  new CreateUser(userRepo),
  new GetUserById(userRepo),
  new GetUserByEmail(userRepo),
  new GetAllUsers(userRepo),
  new DeleteUser(userRepo),
  new UpdateUser(userRepo),
  new LoginUser(userRepo)
);

app.post('/users/register', userController.create);
app.post('/users/login', userController.login);
app.get('/users/:id', userController.getById);
app.get('/users', userController.getAll);
app.delete('/users/:id', userController.delete); 
app.put('/users/:id', userController.update);
 

app.post('/orders', (req, res) => orderController.create(req, res));

app.listen(3000, () => console.log('Backend corriendo en puerto 3000'));
