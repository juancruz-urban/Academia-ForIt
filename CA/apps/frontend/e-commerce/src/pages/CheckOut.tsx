import { Link } from "react-router-dom"
import { ArrowLeft } from "../components/Icons"
import { CheckOutComponent } from "../components/CheckOutComponent"
import '../styles/CheckOut.css'


const CheckOut = () =>{

    return(
        <div>
            <div style={{position:'fixed'}}>
                        <Link className="link" to={'/'}><ArrowLeft></ArrowLeft>Volver</Link>
                      </div>
            <CheckOutComponent></CheckOutComponent>
        </div>
    )

}

export default CheckOut