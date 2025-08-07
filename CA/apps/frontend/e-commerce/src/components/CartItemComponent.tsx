import type { CartItemProps } from "../types";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import '../styles/Cart.css'


const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { deleteItem, updateItemQuantity } = useContext(CartContext);

  return (
    <div className="cart-item">
      <div>
        <p><strong>{item.name}</strong> x{item.quantity}</p>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
        <div>
          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
        </div>
      </div>
      <div className="cart-actions">
        <button onClick={() => deleteItem(item)}>Eliminar</button>
      </div>
    </div>
  );
};





export default CartItemComponent