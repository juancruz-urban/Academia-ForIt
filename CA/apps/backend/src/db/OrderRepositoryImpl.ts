import {Order} from '../../../../domain/src/entities/Order'
import { OrderRepository } from '../../../../domain/src/services/OrderRepository';
import { db } from '../config/db';
import type { OrderProduct } from '../../../../domain/src/entities/OrderProduct';

export class OrderRepositoryImpl implements OrderRepository {
  async save(order: Order): Promise<void> {
    console.log('Guardando orden en DB...', order);
    // Acá iría código real para guardar en la base de datos
  }

  async update(order: Order): Promise<void> {
    
  }

  async findById(id: string): Promise<Order | null> {
    const result = await db.execute({
      sql:'SELECT * FROM orders WHERE id = ?',
      args:[id]
    })
    if(result.rows[0].length==0){
      throw new Error('orden no encontrada')
    }

    const row = result.rows[0]
    
    let products: OrderProduct[] = [];

if (typeof row.products === 'string') {
  products = JSON.parse(row.products) as OrderProduct[];
}

     return new Order(
          Number(row.id), 
          row.userId as string, 
          products, 
          row.total as number,
          row.status as string
        );
  }
}
