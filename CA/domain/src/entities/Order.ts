import type { OrderProduct } from "./OrderProduct";

export class Order {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly products: OrderProduct[]=[],
    public readonly total: number,
    private _status:string | 'pending' | 'paid' | 'cancelled'
    
  ) {

     if (products.length === 0) {
      throw new Error('La orden debe tener al menos un producto');
    }

    const calculated = Order.calculateTotal(products);
    if (total !== calculated) {
      throw new Error('El total no coincide con los productos');
    }
  }

  static calculateTotal(products: { quantity: number; price: number }[]): number {
    return products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  }

  getStatus(){
    return this._status
  }
  
  markAsPaid() {
    if (this._status === 'paid') {
      throw new Error('La orden ya esta pagada')
    }
    this._status = 'paid'
  }

  cancel() {
    if (this._status === 'paid') {
      throw new Error('No se puede cancelar una orden pagada')
    }
    this._status = 'cancelled'
  }
  }

  

  

