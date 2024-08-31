import React from 'react';
import './CoffeeDetails.css';
import coffeeIcon from '../Assets/TioBeta.png';// Asegúrate de tener una imagen similar en tu carpeta de assets

const CoffeeDetails = () => {
  return (
    <div className="coffee-details">
      <div className="coffee-details-container">
        <div className="coffee-icon">
          <img src={coffeeIcon} alt="Nescafe Icon" />
        </div>
        <div className="coffee-info">
          <div className="coffee-type">
            <h3>Tipo de café</h3>
            <p>☕ Soluble</p>
          </div>
          <div className="coffee-notes">
            <h3>Notas de cata</h3>
            <p><i>Sabor completo, atrevido con un aroma intenso</i></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoffeeDetails;
