// backend/db/OrderItemRepositoryImpl.ts
import { db } from "../config/db.js";
import { OrderItemRepository } from "../../../../domain/src/services/OrderItemRepository.js";
import { OrderItem } from "../../../../domain/src/entities/OrderItem.js";

export class OrderItemRepositoryImpl implements OrderItemRepository {
async create(orderItem: Omit<OrderItem, "id">): Promise<OrderItem> {
    const result = await db.execute({
      sql: `INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`,
      args: [orderItem.orderId, orderItem.productId, orderItem.quantity, orderItem.price]
    });

    const id = Number(result.lastInsertRowid);
    console.log(orderItem)
    return new OrderItem(id, orderItem.orderId, orderItem.productId, orderItem.quantity, orderItem.price);
  }

  async getByOrderId(orderId: number): Promise<OrderItem[]> {
    const result = await db.execute({
      sql: `SELECT * FROM order_items WHERE orderId = ?`,
      args: [orderId],
    });

     return result.rows.map(row => new OrderItem(Number(row.id), Number(row.orderId), Number(row.productId), Number(row.quantity), Number(row.price)));
  }

  async deleteByOrderId(orderId: number): Promise<void> {
    await db.execute({
      sql: `DELETE FROM order_items WHERE orderId = ?`,
      args: [orderId],
    });
  }
}
