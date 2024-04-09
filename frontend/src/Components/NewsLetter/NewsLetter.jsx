import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Obten Ofertas Exclusivas en tu Gmail</h1>
        <p>Subcribete a nuestro canal de YouTube</p>
        <div>
          <input type="gmail" placeholder='Tu  direccion e Gmail' />  
          <button>Subcribete</button>
        </div>
      
    </div>
  )
}

export default NewsLetter
