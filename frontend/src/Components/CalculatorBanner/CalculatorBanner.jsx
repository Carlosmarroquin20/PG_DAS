import React from 'react';
import './CalculatorBanner.css';
import exlusive_image from '../Assets/TioBeta.png';
import { Link } from 'react-router-dom';

const CalculatorBanner = () => {
  return (
    <div className='CalculatorBanner'>
      <div className="CalculatorBanner-left">
        <h1>Calculadora Agricola</h1>
        <p>Optimiza tu cultivo con recomendaciones personalizadas. ¡Prueba nuestra calculadora ahora!</p>
        <Link to="/calculator"><button>PRUEBA AHORA!</button></Link>
      </div>
      <div className="CalculatorBanner-right">
        <img src={exlusive_image} alt="Tío Checha" />
      </div>
    </div>
  );
}

export default CalculatorBanner;