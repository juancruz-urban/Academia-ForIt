// domain/use-cases/UpdateOrderStatus.ts
import { OrderRepository } from "../services/OrderRepository";

export class UpdateOrderStatus {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(orderId: number, newStatus: 'pending' | 'paid' | 'cancelled'): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");

    switch (newStatus) {
      case "paid": order.markAsPaid(); break;
      case "cancelled": order.cancel(); break;
      default: throw new Error(`Invalid status: ${newStatus}`);
    }

    await this.orderRepo.update(order);
  }
}
