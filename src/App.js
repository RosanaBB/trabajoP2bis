import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddProduct = () => {
    if (productName && productPrice) {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
      };

      setProducts([...products, newProduct]);
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      updateTotalPrice([...products, newProduct]);
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const handleFinishPurchase = () => {
    alert(`Compra finalizada. Total a pagar: $${totalPrice.toFixed(2)}`);
  };

  const updateTotalPrice = (updatedProducts) => {
    const totalPrice = updatedProducts.reduce((acc, product) => acc + product.price, 0);
    setTotalPrice(totalPrice);
  };

  return (
    <div className="app">
      <div className="section">
        <h2>Agregar Producto</h2>
        <form>
          <label>Nombre:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label>Descripción:</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <label>Precio:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              handleAddProduct();
            }}
            disabled={!productName || !productPrice}
          >
            Agregar
          </button>
        </form>
      </div>
      <div className="section">
        <h2>Carrito de Compras</h2>
        {products.length === 0 ? (
          <p>Cargar productos</p>
        ) : (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <span>{product.name}</span>
                {product.description && <span>{product.description}</span>}
                <span>${product.price}</span>
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveProduct(index);
                  }}
                >
                  Sacar del carrito
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="total-price">Precio total: ${totalPrice.toFixed(2)}</div>
        {products.length > 0 && (
          <button type="button" onClick={handleFinishPurchase}>
            Finalizar compra
          </button>
        )}
      </div>
    </div>
  );
};

export default App;




