import React from 'react';
import './ProductDetailTP.css';
import productImage from '../Assets/TioBeta.png';
 // Asegúrate de tener una imagen similar en tu carpeta de assets

const ProductDetailTP = () => {
  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={productImage} alt="Nescafe Classic" />
      </div>
      <div className="product-info">
        <h4>NESCAFÉ<sup>®</sup> Soluble</h4>
        <h1>Classic</h1>
        <div className="product-rating">
          ★★★★★ <span>PRODUCTO 5 ESTRELLAS!!!</span>
        </div>
        <p>Nuestro exclusivo café, con su tueste medio, aroma inconfundible y sabor completo.</p>
        <button className="buy-button">Comprar Ahora</button>
        <div className="product-options">
          <label>Tarro</label>
          <div className="weights">
            <button>50g</button>
            <button>100g</button>
            <button>200g</button>
            <button>300g</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailTP;
