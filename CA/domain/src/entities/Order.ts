
import { OrderItem } from "./OrderItem";

export class Order {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    private _status: 'pending' | 'paid' | 'cancelled' = 'pending',
    public readonly items: OrderItem[] = []
  ) {}

  get status() {
    return this._status;
  }

  markAsPaid() {
    if (this._status === 'paid') throw new Error('Order is already paid');
    this._status = 'paid';
  }

  cancel() {
    if (this._status === 'paid') throw new Error('Paid orders cannot be cancelled');
    this._status = 'cancelled';
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

  

  

