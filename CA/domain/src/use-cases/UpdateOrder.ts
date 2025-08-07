import { OrderRepository } from '../services/OrderRepository';


export class UpdateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, newStatus: 'paid' | 'cancelled'): Promise<void> {
    const order = await this.orderRepository.findById(orderId)
    if (!order) {
      throw new Error('Order not found')
    }

    
    switch (newStatus) {
      case 'paid':
        order.markAsPaid()
        break
      case 'cancelled':
        order.cancel()
        break
      default:
        throw new Error(`Unsupported status: ${newStatus}`)
    }

    await this.orderRepository.update(order)
  }
}
