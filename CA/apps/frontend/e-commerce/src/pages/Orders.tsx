import { Link } from "react-router-dom"
import OrdersListComponent from "../components/OrdersListComponent"
import { ArrowLeft } from "../components/Icons"

const Orders = () =>{

    return(
        <div>
            <div style={{position:'fixed'}}>
                        <Link className="link" to={'/'}><ArrowLeft></ArrowLeft>Volver</Link>
                      </div>
            <OrdersListComponent></OrdersListComponent>
        </div>
    )

}

export default Orders