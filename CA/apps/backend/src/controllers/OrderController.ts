import { Request, Response } from 'express';
import { CreateOrder } from '../../../../domain/src/use-cases/CreateOrder';

export class OrderController {
  constructor(private createOrder: CreateOrder) {}

  async create(req: Request, res: Response) {
    try {
      console.log('📥 Body recibido:', req.body);
      const { userId, products } = req.body;
      
      const order = await this.createOrder.execute(userId, products);
      res.status(201).json(order);
    } catch (err) {
       console.error('❌ Error al crear orden:', err);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
  }
}
