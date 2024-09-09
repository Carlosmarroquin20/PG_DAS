import React from 'react';
import Calculator from '../Components/Calculator/Calculator';
import './CSS/CalculatorPage.css';
import YouTubeComponent from '../Components/YouTubeStyle/YouTubeStyle';
import Allproducts from '../Components/Allproducts/Allproducts';


const CalculatorPage = () => {
  return (
    <div className="calculator-page">
      <h1>Calculadora de Cultivos</h1>
      <p>Ingresa los detalles del terreno y selecciona el tipo de cultivo para recibir recomendaciones personalizadas.</p>
      <Calculator />
      <div className="extra-info">
        <h2>Videos y Recursos</h2>
        <p>Además de la calculadora, aquí podrás encontrar más recursos y videos para aprender a mejorar tu cultivo.</p>
      </div>
      <YouTubeComponent />
      <Allproducts />
    </div>

  );
}

export default CalculatorPage;
