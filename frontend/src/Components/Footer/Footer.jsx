import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import facebook_icon from '../Assets/facebook_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Logo" />
        <p>DISTRIBUIDORA AGRICOLA SANDOVAL</p>
      </div>
      <ul className="footer-links">
        <li><Link to="/">Distribuidora</Link></li>
        <li><Link to="/Productos">Productos</Link></li>
        <li><Link to="/Oficinas">Oficinas</Link></li> 
        <li><Link to="/SobreNosotros">Sobre Nosotros</Link></li> 
        <li><Link to="/Contacto">Contacto</Link></li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/distribuidoraagricolasandoval/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.facebook.com/agricola.sandoval.9" target="_blank" rel="noopener noreferrer">
            <img src={facebook_icon} alt="Facebook" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.whatsapp.com/?lang=es_LA" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p> Copyright @2024 Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default Footer;
