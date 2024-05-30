import React, { useState, useContext } from 'react';
import { DasContext } from '../../Context/DasContext';
import './Formulario.css';

const OrderForm = () => {
  const { cartItems, getTotalCartAmount } = useContext(DasContext);
  const [deliveryOption, setDeliveryOption] = useState('distributor');
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    extraPhone: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productsInCart = Object.keys(cartItems)
      .filter(itemId => cartItems[itemId] > 0)
      .map(itemId => ({
        productId: itemId,
        quantity: cartItems[itemId]
      }));

    const orderData = {
      products: productsInCart,
      total: getTotalCartAmount(),
      deliveryOption,
      ...formData
    };

    if (!localStorage.getItem('auth-token')) {
      alert('Por favor, inicie sesión para realizar un pedido.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Pedido realizado con éxito');
      } else {
        alert('Error al realizar el pedido');
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Error al enviar el pedido');
    }
  };

  return (
    <div className="order-form">
      <h1>Formulario de Pedido</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Opción de Entrega</label>
          <select
            name="deliveryOption"
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          >
            <option value="distributor">Recoger en la distribuidora</option>
            <option value="delivery">Entregar a domicilio</option>
          </select>
        </div>
        
        {deliveryOption === 'delivery' ? (
          <div className="form-group">
            <label>Dirección de Entrega</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Escribe tu dirección aquí"
            />
          </div>
        ) : (
          <div className="info-text">Se recogerá en la distribuidora</div>
        )}

        <div className="form-group">
          <label>Número de Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Escribe tu número de teléfono aquí"
          />
        </div>

        <div className="form-group">
          <label>Número de Teléfono Extra</label>
          <input
            type="tel"
            name="extraPhone"
            value={formData.extraPhone}
            onChange={handleChange}
            placeholder="Escribe un número de teléfono extra aquí"
          />
        </div>

        <div className="form-group">
          <label>Comentarios</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Escribe tus comentarios aquí"
          ></textarea>
        </div>

        <button className="submit-button" type="submit">Enviar Pedido</button>
      </form>
    </div>
  );
}

export default OrderForm;
