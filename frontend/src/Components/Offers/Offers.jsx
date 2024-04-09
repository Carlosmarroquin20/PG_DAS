import React from 'react'
import './Offers.css'
import exlusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Ofertas</h1>
        <h1>Para ti</h1>
        <p>Solo en los productos más vendidos</p>
        <button>Miralo Ahora!</button>
      </div>
      <div className="offers-right">
        <img src={exlusive_image} alt="" />

      </div>
    </div>
  )
}

export default Offers
