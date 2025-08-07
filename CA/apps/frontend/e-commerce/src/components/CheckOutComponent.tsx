
import useCart from "../context/CartContext";
import { useEffect } from "react";

export function CheckOutComponent() {
  const { items } = useCart();
  const total = items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="checkout-container">
        

      {items.length > 0 ? (
        <div className="checkout-items">
          {items.map((e) => (
            <div className="checkout-item" key={e.id}>
              <div className="checkout-details">
                <span className="checkout-name">{e.name}</span>
                <span className="checkout-quantity">Cantidad: {e.quantity}</span>
                <span className="checkout-price">Precio unitario: ${e.price}</span>
              </div>
              <div className="checkout-item-total">
                <span>Total: ${(e.quantity * e.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="checkout-empty">No hay productos en tu carrito.</h2>
      )}

      {total > 0 && (
        <div className="checkout-summary">
          <span className="checkout-total">Total a pagar: ${total.toFixed(2)}</span>
          <button onClick={()=>{alert('redirigiendo al pago...')}} className="checkout-pay-button">Pagar</button>
        </div>
      )}
    </div>
  );
}
