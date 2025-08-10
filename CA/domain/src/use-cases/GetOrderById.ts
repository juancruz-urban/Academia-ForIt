// domain/use-cases/GetOrderById.ts
import { OrderRepository } from "../services/OrderRepository";
import { OrderItemRepository } from "../services/OrderItemRepository";
import { Order } from "../entities/Order.js";

export class GetOrderById {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository
  ) {}

  async execute(orderId: number): Promise<Order | null> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) return null;

    const items = await this.orderItemRepo.getByOrderId(orderId);
    return new Order(order.id, order.userId, order.status, items);
  }
}
