import express from 'express';
import { OrderRepositoryImpl } from './db/OrderRepositoryImpl.js';
import { CreateOrder } from '../../../domain/src/use-cases/CreateOrder.js';
import { GetOrderById } from '../../../domain/src/use-cases/GetOrderById.js';
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


import { CreateOrderItem } from '../../../domain/src/use-cases/CreateOrderItem.js';
import { GetOrderItemByOrderId } from '../../../domain/src/use-cases/GetOrderItemByOrderId.ts.js';
import { DeleteOrderItemsByOrderId } from '../../../domain/src/use-cases/DeleteOrderItemsByOrderId.js';
import { UpdateOrderStatus } from '../../../domain/src/use-cases/UpdateOrderStatus.js';
import { GetOrdersByUserId } from '../../../domain/src/use-cases/GetOrdersByUserId.js';

import { OrderItemRepositoryImpl } from './db/OrderItemRepositoryImpl.js';
import { OrderItemController } from './controllers/OrderItemController.js';

const app = express()
app.use(cors({origin:'*'}))
app.use(express.json())


///////////////   ORDERS  //////////////////
const orderRepo = new OrderRepositoryImpl()
const orderItemRepo = new OrderItemRepositoryImpl()

const createOrder = new CreateOrder(orderRepo, orderItemRepo)
const updateOrderStatus = new UpdateOrderStatus(orderRepo)
const getOrder = new GetOrderById(orderRepo, orderItemRepo)
const getOrderByUserId = new GetOrdersByUserId(orderRepo)
const orderController = new OrderController(createOrder,getOrder,updateOrderStatus, getOrderByUserId )

////////// ORDER ITEMS ///////////
const createOrderItem = new CreateOrderItem(orderItemRepo)
const getOrderItem = new GetOrderItemByOrderId(orderItemRepo)
const deleteOrderItem = new DeleteOrderItemsByOrderId(orderItemRepo)
const orderItemController = new OrderItemController(createOrderItem,getOrderItem,deleteOrderItem)



///////////////   USERS  ////////////////
const userRepo = new UserRepositoryImpl()
const userController = new UserController(
  new CreateUser(userRepo),
  new GetUserById(userRepo),
  new GetUserByEmail(userRepo),
  new GetAllUsers(userRepo),
  new DeleteUser(userRepo),
  new UpdateUser(userRepo),
  new LoginUser(userRepo)
)

app.post('/users/register', userController.create)
app.post('/users/login', userController.login)
app.get('/users/:id', userController.getById)
app.get('/users', userController.getAll)
app.delete('/users/:id', userController.delete)
app.put('/users/:id', userController.update)
 

app.post('/orders', (req, res) => orderController.create(req, res))
app.patch('/orders/:id/status', (req, res) => orderController.updateStatus(req, res))
app.get("/orders/user/:userId", (req, res) => orderController.getByUserId(req, res))


app.post("/order-items", orderItemController.create)
app.get("/order-items/:orderId", orderItemController.getByOrderId)
app.delete("/order-items/:orderId", orderItemController.deleteByOrderId)

app.listen(3000, () => console.log('Backend corriendo en puerto 3000'))
