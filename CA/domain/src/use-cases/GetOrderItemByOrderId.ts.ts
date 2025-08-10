import { OrderItem } from "../entities/OrderItem";
import { OrderItemRepository } from "../services/OrderItemRepository";

export class GetOrderItemByOrderId {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async execute(orderId: number): Promise<OrderItem[]> {
    return await this.orderItemRepository.getByOrderId(orderId);
  }
}
