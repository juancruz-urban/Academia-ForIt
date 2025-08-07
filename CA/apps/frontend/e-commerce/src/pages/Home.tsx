

import { AuthContext } from "../context/AuthContext"
import { useContext, useEffect } from "react"
import '../styles/Home.css'
import { ProductList } from "../components/ProductList"
import { Header } from "../components/Header"

const Home = () => {
  const { user } = useContext(AuthContext)
 
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <div>
      <Header></Header>
  
      <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
          <h1 className="home-title">¡Hola, {user?.name || "Usuario"}!</h1>
          <p className="home-subtitle">Bienvenido a tu e-commerce favorito</p>
        </div>

       <div>
        
        <ProductList></ProductList>
       </div>




      </div>
    </div>
    </div>
  )
}

export default Home

