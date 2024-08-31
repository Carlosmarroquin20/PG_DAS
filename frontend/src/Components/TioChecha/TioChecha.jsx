      import React from 'react'
      import './TioChecha.css'
      import exlusive_image from '../Assets/TioBeta.png'
      import { Link } from 'react-router-dom';

      const TioChecha = () => {
        return (
          <div className='TioChecha'>
            <div className="TioChecha-left">
              <h1>Nuevo cafe</h1>
              <h1>TIO CHECHA</h1>
              <p>Despierta tu día, una taza a la vez.</p>
              <Link to="/TPMAIN"><button>Compra ahora!</button></Link>
            </div>
            <div className="TioChecha-right">
              <img src={exlusive_image} alt="" />

            </div>
          </div>
        )
      }

      export default TioChecha
