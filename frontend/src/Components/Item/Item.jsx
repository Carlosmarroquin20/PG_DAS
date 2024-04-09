import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/Productos/${props.id}`}><img src={props.image} alt="" /></Link> {/* Usar comillas invertidas para el template literal */}
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                Q{props.new_price}
            </div>
            <div className="item-price-old">
                Q{props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item
