// domain/use-cases/CreateOrder.ts
import { OrderRepository } from "../services/OrderRepository.js";
import { OrderItemRepository } from "../services/OrderItemRepository.js";
import { Order } from "../entities/Order.js";

export class CreateOrder {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository
  ) {}

  async execute(
    userId: number,
    products: { id: number; quantity: number; price: number }[]
  ) {
    const newOrder = await this.orderRepo.create({
      userId,
      status: "pending"
    });
   
    for (const p of products) {
      await this.orderItemRepo.create({
        orderId: newOrder.id,
        productId: p.id,
        quantity: p.quantity,
        price: p.price
      });
    }

    const items = await this.orderItemRepo.getByOrderId(newOrder.id);
    return new Order(newOrder.id, userId, "pending", items);
  }
}
