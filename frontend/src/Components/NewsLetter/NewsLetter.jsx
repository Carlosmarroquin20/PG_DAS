import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Obten Ofertas Exclusivas en tu Gmail</h1>
        <p>Ingresa tu correo electronico</p>
        <div>
          <input type="gmail" placeholder='Tu  direccion e Gmail' />  
          <button>Subcribete</button>
        </div>
      
    </div>
  )
}

export default NewsLetter
