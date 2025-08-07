import { Order } from '../entities/Order.js';
import { OrderRepository } from '../services/OrderRepository.js';
import { randomUUID } from 'crypto';

export class CreateOrder {
  constructor(private orderRepo: OrderRepository) {}

  async execute(userId: string, products: { id: string; quantity: number; price: number }[]) {
    const total = Order.calculateTotal(products);
    const order = new Order(randomUUID(), userId, products, total);
    await this.orderRepo.save(order);
    return order;
  }
}
