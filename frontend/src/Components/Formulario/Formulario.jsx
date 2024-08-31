import React, { useState, useContext } from 'react';
import { DasContext } from '../../Context/DasContext';
import './Formulario.css';

const OrderForm = () => {
  const { cartItems, getTotalCartAmount, setCartItems } = useContext(DasContext); // Asegúrate de tener setCartItems para limpiar el carrito
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
    if (deliveryOption === 'delivery' && !formData.address) {
      alert('Por favor, proporciona una dirección de entrega.');
      return;
    }

    const productsInCart = Object.keys(cartItems)
      .filter(itemId => cartItems[itemId] > 0)
      .map(itemId => ({
        productId: itemId,
        quantity: cartItems[itemId]
      }));

    if (!productsInCart.length) {
      alert('No hay productos en el carrito.');
      return;
    }

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}orders/create`, { // Cambio aquí
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) { // Se recomienda usar response.ok para verificar si la solicitud fue exitosa
        alert('Pedido realizado con éxito');
        setFormData({
          address: '',
          phone: '',
          extraPhone: '',
          comment: ''
        }); // Limpia el formulario

        setCartItems({}); // Limpia el carrito

        // Aquí también podrías redirigir al usuario, por ejemplo:
        // window.location.href = '/order-confirmation';
      } else {
        alert('Error al realizar el pedido: ' + (data.errors || 'Unknown Error'));
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
        
        {deliveryOption === 'delivery' && (
          <div className="form-group">
            <label>Dirección de Entrega</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Escribe tu dirección aquí"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Número de Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Escribe tu número de teléfono aquí"
            required
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
