import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const { Productos } = props; 
    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> DISTRIBUIDORA <img src={arrow_icon} alt="" /> {Productos.category} <img src={arrow_icon} alt="" /> {Productos.name} {/* Aquí cambia catecory a category */}
        </div>
    )
}

export default Breadcrum
