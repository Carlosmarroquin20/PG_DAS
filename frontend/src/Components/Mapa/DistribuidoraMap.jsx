import React from 'react';
import './DistribuidoraMap.css';

const DistribuidoraMap = () => {
  return (
    <div className="distribuidora-container">
      <div className="address-section">
        <h2>Distribuidora Agrícola Sandoval</h2>
        <p>Dirección: Jalapa, Guatemala</p>
        <p>Teléfono: +502 45986585</p>
      </div>
      <div className="map-section">
        <iframe
          title="Distribuidora Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d604.6924196870473!2d-89.99935760681518!3d14.651809703755147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sgt!4v1726079455732!5m2!1ses!2sgt"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default DistribuidoraMap;
