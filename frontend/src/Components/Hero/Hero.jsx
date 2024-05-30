import React from 'react'
import './Hero.css'

import arrow_icon from '..//Assets/arrow.png'
import hero_image from '..//Assets/GR1.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Distribuidora Agrícola Sandoval: Tu aliado en el campo.</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>¡Haz crecer</p>
                </div>
                <p>tu cosecha!!</p>
                <p>y tu éxito!</p>
            </div>
            <div className="hero-latest-btn">
                <div>Ultimos Productos!!!</div>
                <img src={arrow_icon} alt=""/>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt=""/>
        </div>
    </div>
  )
}

export default Hero
