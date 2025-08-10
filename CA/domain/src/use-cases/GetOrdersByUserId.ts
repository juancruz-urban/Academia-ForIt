import { Order } from "../entities/Order";
import { OrderRepository } from "../services/OrderRepository";

export class GetOrdersByUserId {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: number): Promise<Order[] | null> {
    if (!userId || isNaN(userId)) {
      throw new Error("Invalid user ID");
    }
    return this.orderRepository.findByUserId(userId);
  }
}
