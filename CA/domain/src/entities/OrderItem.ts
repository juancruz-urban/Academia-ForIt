// domain/entities/OrderItem.ts
export class OrderItem {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly productId: number,
    public quantity: number,
    public price: number
  ) {}
}
