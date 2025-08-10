import { Order } from '../entities/Order';

export interface OrderRepository {
  
   create(order: { userId: number; status: 'pending' | 'paid' | 'cancelled' }): Promise<Order>;
    findById(id: number): Promise<Order | null>;
  update(order: Order): Promise<void>;

}
