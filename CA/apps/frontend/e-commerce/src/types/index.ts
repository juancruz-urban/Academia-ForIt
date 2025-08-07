export interface CartItem {
  id: number;        
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;  // opcional
}
export interface CartItemProps {
  item: CartItem;
}


export interface Cart {
  items: CartItem[];
  deleteItem:(item:CartItem)=>void;
 
}

export interface CartProps {
  cart: Cart;
}
