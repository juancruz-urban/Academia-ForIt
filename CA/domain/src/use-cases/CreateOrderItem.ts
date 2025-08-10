import { OrderItem } from "../entities/OrderItem";
import { OrderItemRepository } from "../services/OrderItemRepository";

export class CreateOrderItem {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async execute(orderItemData: Omit<OrderItem, 'id'>): Promise<OrderItem> {
    return await this.orderItemRepository.create(orderItemData);
  }
}
