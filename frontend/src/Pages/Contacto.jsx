import React from 'react';
import './CSS/Contacto.css'; // Asegúrate de crear y vincular el CSS

function Contacto() {
  return (
    <div className="contacto-container">
      <div className="text-section">
        <h1>¡Estamos aquí para ayudarte!</h1>
        <h2>Bienvenidos a Distribuidora Agrícola Sandoval</h2>
        <p>En Distribuidora Agrícola Sandoval, nuestra pasión es apoyar a los agricultores y productores con las mejores soluciones en fertilizantes, productos foliares y fungicidas. Con más de una década de experiencia en la industria, nos comprometemos a ofrecer productos de alta calidad que promuevan una agricultura sostenible y eficiente.</p>
        <p>Si tienes preguntas sobre nuestros productos, necesitas asesoría para elegir la solución adecuada, o quieres saber más sobre cómo podemos ayudarte a maximizar tu rendimiento agrícola, no dudes en contactarnos. Nuestro equipo de expertos está listo para asistirte y proporcionarte la información y el soporte que necesitas.</p>
        <div className="contact-info">
          <h3>Contáctanos</h3>
          <p><strong>Teléfono:</strong> [Número de teléfono]</p>
          <p><strong>Correo Electrónico:</strong> [Dirección de email]</p>
          <p><strong>Dirección:</strong> [Dirección física completa]</p>
        </div>
        <p>Nuestro compromiso es con tu éxito en el campo. Estamos aquí para ofrecerte apoyo, asesoría y los mejores productos del mercado. ¡Esperamos tener noticias tuyas pronto!</p>
      </div>
      <div className="image-section">
        <img src="https://images.unsplash.com/photo-1527847263472-aa5338d178b8?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Campo agrícola" />
      </div>
    </div>                                                                  
  );
}

export default Contacto;
