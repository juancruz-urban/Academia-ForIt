
import CartComponent from "../components/CartComponent"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import '../styles/Cart.css'
import { Link } from "react-router-dom"
import { ArrowLeft } from "../components/Icons"

const Cart = () => {

    const {items,deleteItem} = useContext(CartContext)
    
    return(
        <div >
          <div style={{position:'fixed'}}>
            <Link className="link" to={'/'}><ArrowLeft></ArrowLeft>Volver</Link>
          </div>
           {
            items.length>0 && (
                <CartComponent items={items} deleteItem={deleteItem}></CartComponent>
            )
           }
        </div>
    )
}

export default Cart