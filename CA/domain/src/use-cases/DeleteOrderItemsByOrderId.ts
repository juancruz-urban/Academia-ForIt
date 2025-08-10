import { OrderItemRepository } from "../services/OrderItemRepository";
export class DeleteOrderItemsByOrderId {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async execute(orderId: number): Promise<void> {
    await this.orderItemRepository.deleteByOrderId(orderId);
  }
}
