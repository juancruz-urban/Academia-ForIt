
import type {Cart} from '../types/index'
import CartItemComponent from "./CartItem";

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const CartComponent: React.FC<Cart> = ({items}) => {
  

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
 
  return (
    <div className="cart-container">
     <h2>Tu carrito</h2>
      <span>{items.length} producto(s)</span>
      {items.map(item => (
        <div key={item.id}>
          <CartItemComponent item={item} />
          
        </div>
      ))} 
      <div>
        <Link to={'/checkout'} className='cart-checkout-button'>Prodecer con el pago</Link>
      </div>
    </div>
  );
};


export default CartComponent