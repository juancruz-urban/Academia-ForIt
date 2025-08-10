import { Request, Response } from "express";
import {CreateOrderItem} from '../../../../domain/src/use-cases/CreateOrderItem'
import { GetOrderItemByOrderId } from "../../../../domain/src/use-cases/GetOrderItemByOrderId.ts";
import { DeleteOrderItemsByOrderId } from "../../../../domain/src/use-cases/DeleteOrderItemsByOrderId.js";

export class OrderItemController {
  constructor(
    private createOrderItemUseCase: CreateOrderItem,
    private getOrderItemsByOrderIdUseCase: GetOrderItemByOrderId,
    private deleteOrderItemsByOrderIdUseCase: DeleteOrderItemsByOrderId
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const orderItem = await this.createOrderItemUseCase.execute(req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getByOrderId = async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.orderId);
      const items = await this.getOrderItemsByOrderIdUseCase.execute(orderId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  deleteByOrderId = async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.orderId);
      await this.deleteOrderItemsByOrderIdUseCase.execute(orderId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}
