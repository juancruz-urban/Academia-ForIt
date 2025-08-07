import { createContext, useContext } from "react";
import type { CartItem } from "../types";
import { useEffect, useState } from "react";

interface CartContextProps{
    items:CartItem[],
    addItem: (item:CartItem)=> void,
    deleteItem : (item:CartItem)=>void
    updateItemQuantity : (id:number,quantity:number)=>void

}

export const CartContext = createContext<CartContextProps>({
  items: [],
  addItem: () => {}, 
  deleteItem: () => {}, 
  updateItemQuantity: ()=>{}
});

export const CartProvider:React.FC<{ children: React.ReactNode }> = ({ children }) =>{

    const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    const exists = items.find(i => i.id === item.id);
    if (exists) {
      const updated = items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
      setItems(updated);
    } else {
      setItems([...items, item]);
    }
  };

  const deleteItem = (item:CartItem) =>{
     
        const updated = items.filter(e => e.id !== item.id)
        setItems(updated)

  }


  const updateItemQuantity = (id: number, quantity: number) => {
  if (quantity <= 0) return


  setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  
};

    useEffect(()=>{

    },[items.length])



    return(
        <CartContext.Provider value={{items,addItem, deleteItem,updateItemQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default function useCart(){
    const cartContext = useContext(CartContext)
    return cartContext
}