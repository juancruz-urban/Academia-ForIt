export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly products: { id: string; quantity: number; price: number }[],
    public readonly total: number
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
  
  }

  

  

