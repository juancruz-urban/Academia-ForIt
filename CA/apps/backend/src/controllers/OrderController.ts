// backend/controllers/OrderController.ts
import { Request, Response } from "express";
import { CreateOrder } from "../../../../domain/src/use-cases/CreateOrder";
import { GetOrderById } from "../../../../domain/src/use-cases/GetOrderById";
import { UpdateOrderStatus } from "../../../../domain/src/use-cases/UpdateOrderStatus";

export class OrderController {
  constructor(
    private readonly createOrder: CreateOrder,
    private readonly getOrderById: GetOrderById,
    private readonly updateOrderStatus: UpdateOrderStatus
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { userId, products } = req.body;
      const order = await this.createOrder.execute(userId, products);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const order = await this.getOrderById.execute(Number(req.params.id));
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      await this.updateOrderStatus.execute(Number(req.params.id), req.body.status);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };
}
