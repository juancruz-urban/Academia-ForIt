import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartIcon, LogoutIcon } from "./Icons";
import "../styles/Header.css";

export function Header() {
  const { user, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="header-logo">Mi Tienda</Link>

        <div className="header-right">
          <Link to="/cart" className="cart-link">
            <CartIcon />
            <span className="cart-count">{items.length}</span>
          </Link>

          {user && (
            <button className="logout-button" onClick={logout}>
             <span className="text-btn">Cerrar sesion </span><LogoutIcon></LogoutIcon>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
