import React, { useContext } from 'react'
import './ProductDisplay.css'
import start_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { DasContext } from '../../Context/DasContext';

const ProductDisplay = (props) => {

    const {Productos} = props;
    const {addToCart} = useContext(DasContext)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={Productos.image} alt="" />
                <img src={Productos.image} alt="" />
                <img src={Productos.image} alt="" />
                <img src={Productos.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={Productos.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{Productos.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={start_icon} alt="" />
                <img src={start_icon} alt="" />
                <img src={start_icon} alt="" />
                <img src={start_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">Q{Productos.old_price}</div>
                <div className="productdisplay-right-price-new">Q{Productos.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
            Productos de alta calidad para tus necesidades agrícolas. Encuentra una amplia gama de herramientas, equipos y suministros agrícolas para mejorar la productividad y el rendimiento de tu cultivo. Desde semillas hasta herramientas de jardinería, tenemos todo lo que necesitas para cultivar con éxito.    
            </div>

            <button onClick={()=>{addToCart(Productos.id)}}>Agregar al carrito</button>
            <p className='productdisplay-right-category'><span>Categoria : </span> Test1, Test2, Test3</p>
            <p className='productdisplay-right-category'><span>Tags : </span> Test1, Test2, Test3</p>


        </div>
        
      
    </div>
  )
}

export default ProductDisplay
