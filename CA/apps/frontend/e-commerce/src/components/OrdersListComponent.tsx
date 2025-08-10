import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/OrderListComponent.css";



interface Order {
  id: number
  _status: "pending" | "paid" | "cancelled"
  total: number
  date?: string,
  items: []
}
interface OrderProduct {
  productId: number;
  quantity: number;
  price: number;
}

export default function OrdersListComponent() {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState<Order[]>([])
  const userId = user?.id;

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/user/${userId}`)
      if (!response.ok) {
        console.error("Error HTTP:", response.status)
        return
      }
      const data: Order[] = await response.json()
      console.log(data)
      setOrders(data)
    } catch (err) {
      console.error("Error al obtener órdenes:", err)
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserOrders()
    }
    console.log(orders)
  }, [userId])

  const calculateTotal = (products: OrderProduct[]) =>
    products.reduce((acc, p) => acc + p.quantity * p.price, 0);


  return (
    <div className="orders-container">
      <h2 className="orders-title">Mis Órdenes</h2>
      <ul className="orders-list">
        {orders.length > 0 ? (
          orders.map((e) => (
            <li key={e.id} className="order-item">
              <div className="order-info">
                <span className="order-id">Orden #{e.id}</span>
                <span className={`order-status status-${e._status}`}>
                  {e._status}
                </span>
                <span className="order-date">{e.date || "Sin fecha" }</span>
              </div>
              <div className="order-total">${calculateTotal(e.items)}</div>
            </li>
          ))
        ) : (
          <p>No tienes órdenes registradas.</p>
        )}
      </ul>
    </div>
  );
}
