
import useCart from "../context/CartContext";
import { useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export function CheckOutComponent() {
  const { items } = useCart();
  const {user} = useContext(AuthContext)
  const total = items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const sendData = async() =>{

    const userId = user?.id
    const products = items
    if(!userId)return
    try{

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId:userId, products })})
        if (!response.ok) {
        console.log(response)
      }
    }catch(e){
      console.error(e)
    }
    finally{
      alert('orden creada satisfactoriamente')
    }
  }
  
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
          <button onClick={sendData} className="checkout-pay-button">Pagar</button>
        </div>
      )}
    </div>
  );
}
