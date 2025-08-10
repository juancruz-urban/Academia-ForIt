// backend/db/OrderRepositoryImpl.ts
import { db } from "../config/db.js";
import { OrderRepository } from "../../../../domain/src/services/OrderRepository.js";
import { Order } from "../../../../domain/src/entities/Order.js";
import { OrderItemRepositoryImpl } from "./OrderItemRepositoryImpl.js";

export class OrderRepositoryImpl implements OrderRepository {
  
  private orderItemRepo = new OrderItemRepositoryImpl()

  async create(order: Omit<Order, "id" | "items">): Promise<Order> {

    const result = await db.execute({
      sql: `INSERT INTO orders (userId, status) VALUES (?, ?)`,
      args: [order.userId, order.status],
    })

    const id = Number(result.lastInsertRowid)
    return new Order(id, order.userId, order.status)
  }

  async findById(id: number): Promise<Order | null> {
    const result = await db.execute({
      sql: `SELECT * FROM orders WHERE id = ?`,
      args: [id],
    })

    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new Order(Number(row.id), Number(row.userId), row.status as any)
  }

  async update(order: Order): Promise<void> {
   
    await db.execute({
      sql: `UPDATE orders SET status = ? WHERE id = ?`,
      args: [order.status, order.id],
    })
  }

  async findByUserId(userId: number): Promise<Order[]> {

   const result = await db.execute({
      sql: "SELECT * FROM orders WHERE userId = ?",
      args: [userId]
    });

    const orders: Order[] = []
    for (const row of result.rows) {
      const items = await this.orderItemRepo.getByOrderId(Number(row.id));
      orders.push(
        new Order(
          Number(row.id),
          Number(row.userId),
          row.status as "pending" | "paid" | "cancelled",
          items
        )
      );
    }
    return orders
  }
}
