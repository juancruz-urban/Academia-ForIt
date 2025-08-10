// domain/services/OrderItemRepository.ts
import { OrderItem } from "../entities/OrderItem";

export interface OrderItemRepository {
  create(orderItem: Omit<OrderItem, "id">): Promise<OrderItem>;
  getByOrderId(orderId: number): Promise<OrderItem[]>;
  deleteByOrderId(orderId: number): Promise<void>;
}
