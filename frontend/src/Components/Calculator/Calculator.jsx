import React, { useState } from 'react';
import './Calculator.css';
import tomateImage from '../Assets/Tomate1.png';
import maizImage from '../Assets/Maiz1.png';
import cafeImage from '../Assets/Cafe1.png';

const recommendations = {
  tomate: {
    image: tomateImage,
    water: (area) => `Riega el tomate 2 veces al día. Necesitas aproximadamente ${area * 1.5} litros de agua por día.`,
    climate: 'El clima ideal para el tomate es templado, entre 20-25°C.',
    fertilization: 'Aplicar fertilizante cada 15 días, usando un fertilizante rico en fósforo.',
    monitoring: 'Monitorear las plantas diariamente para detectar plagas o enfermedades.',
    video: 'https://www.youtube.com/watch?v=video_tomate',
  },
  maiz: {
    image: maizImage,
    water: (area) => `El maíz necesita ser regado 3 veces por semana con aproximadamente ${area * 2} litros de agua por semana.`,
    climate: 'El maíz requiere un clima cálido, entre 25-30°C.',
    fertilization: 'Aplicar fertilizante cada 30 días, preferiblemente un fertilizante nitrogenado.',
    monitoring: 'Monitorear cada semana durante las primeras etapas de crecimiento.',
    video: 'https://www.youtube.com/watch?v=video_maiz',
  },
  cafe: {
    image: cafeImage,
    water: (area) => `El café necesita ser regado diariamente, con aproximadamente ${area * 1} litros de agua por día.`,
    climate: 'El café prospera en climas frescos, entre 15-24°C.',
    fertilization: 'Fertilizar cada 6 semanas con un fertilizante de liberación lenta.',
    monitoring: 'Monitorear cada dos días para controlar la humedad y las plagas.',
    video: 'https://www.youtube.com/watch?v=video_cafe',
  },
};

const Calculator = () => {
  const [area, setArea] = useState(100);  // Valor inicial de 100 metros cuadrados
  const [selectedPlant, setSelectedPlant] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!selectedPlant || area <= 0) {
      alert('Por favor, ingresa todos los campos');
      return;
    }
    setResult(recommendations[selectedPlant]);
  };

  const incrementArea = () => setArea(area + 10);
  const decrementArea = () => setArea(area > 0 ? area - 10 : 0);

  return (
    <div className="calculator-container">
      <h2>Calculadora de Cultivos</h2>
      <div className="calculator-form">
        <label>Ingresa los metros cuadrados del terreno:</label>
        <div className="area-input">
          <button onClick={decrementArea}>-</button>
          <span>{area} m²</span>
          <button onClick={incrementArea}>+</button>
        </div>
        
        <label htmlFor="plant">Selecciona el cultivo:</label>
        <select
          id="plant"
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          <option value="tomate">Tomate</option>
          <option value="maiz">Maíz</option>
          <option value="cafe">Café</option>
        </select>

        <button onClick={handleCalculate}>Calcular</button>
      </div>

      {result && (
        <div className="calculator-result">
          <img
            src={result.image}
            alt={selectedPlant}
            className="plant-image"
          />
          <div className="recommendation">
            <h3>Recomendaciones para {selectedPlant}</h3>
            <p><strong>💧 Riego:</strong> {result.water(area)}</p>
            <p><strong>🌤️ Clima:</strong> {result.climate}</p>
            <p><strong>🌱 Fertilización:</strong> {result.fertilization}</p>
            <p><strong>👀 Monitoreo:</strong> {result.monitoring}</p>
            <a
              href={result.video}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              Ver video de cultivo
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
