import {Order} from '../../../../domain/src/entities/Order'
import { OrderRepository } from '../../../../domain/src/services/OrderRepository';

export class OrderRepositoryImpl implements OrderRepository {
  async save(order: Order): Promise<void> {
    console.log('Guardando orden en DB...', order);
    // Acá iría código real para guardar en la base de datos
  }
}
