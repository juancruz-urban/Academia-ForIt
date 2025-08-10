import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Register } from "./pages/Register";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
         <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        } />
         <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
      
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
