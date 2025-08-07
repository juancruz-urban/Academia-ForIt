import { useState, useContext, useEffect } from "react";
import "../styles/Products.css";
import { CartContext } from "../context/CartContext";
import type { CartItem } from "../types";
import productsMock from '../utils/products.ts';

export function ProductList() {
  const { addItem } = useContext(CartContext);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(productsMock.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<typeof productsMock>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setProducts(productsMock.slice(startIndex, endIndex));
  }, [currentPage]);

  const handleAdd = (product: typeof productsMock[number]) => {
    const item: CartItem = {
      ...product,
      quantity: 1,
    };
    addItem(item);
  };

  const handleUpPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleDownPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column'}}>


      <div className="products-grid-container">
      <div className="products-grid">
        {products.map((e) => (
          <li key={e.id}>
            <Product product={e} addProduct={() => handleAdd(e)} />
          </li>
        ))}
      </div>
    </div>

        <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto 0',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <button onClick={handleDownPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span style={{ alignSelf: 'center' }}>Página {currentPage} de {totalPages}</span>
        <button onClick={handleUpPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div> 


    </div>
  );
}


interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
  },
  addProduct: () => void
}

export function Product({ product, addProduct }: ProductProps) {
  return (
    <div className="product">
      <h4>{product.name}</h4>
      <img  src="/Sin título.png" style={{width:'100%', height:'auto', objectFit:'cover'}}></img>
      <span>${product.price}</span>
      <span>{product.category}</span>
      <span>{product.description}</span>
      <button onClick={addProduct}>Agregar al carrito</button>
    </div>
  );
}
