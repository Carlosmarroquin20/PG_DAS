import React from 'react';
import './CSS/TioChechaMain.css';
import ProductDetailTP from '../Components/ProductDetailTP/ProductDetailTP';
import CoffeeDetails from '../Components/CoffeeDetails/CoffeeDetails';

const TioChechaMain = () => {
  return (
    <div className="TioChechaMain">
      <h1>Café TIO CHECHA</h1>
      <p>Despierta tu día con nuestro exquisito café TIO CHECHA. Cultivado en las mejores tierras y tostado a la perfección para ofrecerte un sabor único e inigualable.</p>
      <p>Disponible en presentaciones de 250g, 500g y 1kg.</p>
      <p>¡Haz tu pedido hoy y disfruta de la mejor taza de café!</p>
      <ProductDetailTP />
      <CoffeeDetails />
    </div>
  );
}

export default TioChechaMain;
