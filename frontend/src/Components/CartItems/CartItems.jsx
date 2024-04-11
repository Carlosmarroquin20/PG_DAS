import React, { useContext } from 'react'
import './CartItems.css'
import { DasContext } from '../../Context/DasContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(DasContext);
    
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Productos</p>
                <p>Titulo</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Total</p>
                <p>Eliminar</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>Q{e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>Q{e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total del Carrito</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Q{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Metodo de entrega</p>
                            <p>Pendiente a verificar...</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3> Total </h3>
                            <h3>Q{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEDER A CONFIRMACION DE DETALLES</button>
                </div>
                <div className="cartitems-promocode">
                    <p> Si tienes un codigo de descuento, ingresalo aqui</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Agregar</button>

                    </div>


                </div>


            </div>

        </div>
    );
}

export default CartItems;
