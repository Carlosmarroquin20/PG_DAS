import React, { useEffect, useState } from 'react';
import './Allproducts.css';

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products/allproducts');
      const data = await response.json();

      if (response.ok) {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setError('No se encontraron productos.');
        }
      } else {
        throw new Error('Error al obtener los productos');
      }
    } catch (error) {
      setError('Hubo un error al cargar los productos.');
      console.error("Error en la solicitud de productos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!products.length) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <img
            src={product.image} // La URL ya corregida y almacenada en el campo "image"
            alt={product.name}
            className="product-image"
            onError={(e) => { e.target.src = '/default-image.jpg'; }} // Imagen por defecto en caso de error
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.new_price || "Precio no disponible"}</p>
        </div>
      ))}
    </div>
  );
};

export default Allproducts;
