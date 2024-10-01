import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { DasContext, getDefaulCart } from '../../Context/DasContext'; // Asegúrate de importar getDefaulCart
import './Formulario.css';

const OrderForm = () => {
  const { cartItems, getTotalCartAmount, setCartItems } = useContext(DasContext); 
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

    const userId = localStorage.getItem('userId'); 
    const authToken = localStorage.getItem('auth-token'); 

    if (!userId || !authToken) {
      Swal.fire({
        title: 'Error',
        text: 'Usuario no autenticado.',
        icon: 'error'
      });
      return;
    }

    if (deliveryOption === 'delivery' && !formData.address) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, proporciona una dirección de entrega.',
        icon: 'warning'
      });
      return;
    }

    if (!formData.phone) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, proporciona un número de teléfono.',
        icon: 'warning'
      });
      return;
    }

    const products = Object.keys(cartItems)
      .filter(itemId => cartItems[itemId] > 0)
      .map(itemId => ({
        productId: itemId,
        quantity: cartItems[itemId]
      }));

    if (!products.length) {
      Swal.fire({
        title: 'Error',
        text: 'No hay productos en el carrito.',
        icon: 'warning'
      });
      return;
    }

    const orderData = {
      userId, 
      products,
      total: getTotalCartAmount(),
      deliveryOption,
      ...formData
    };

    // Muestra una alerta de confirmación antes de proceder con el envío
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, realizar pedido"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}orders/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': authToken 
            },
            body: JSON.stringify(orderData)
          });

          const data = await response.json();

          if (response.ok) {
            Swal.fire({
              title: '¡Pedido realizado!',
              text: 'Tu pedido ha sido realizado con éxito',
              icon: 'success'
            });

            setFormData({
              address: '',
              phone: '',
              extraPhone: '',
              comment: ''
            }); 

            setCartItems(getDefaulCart()); // Limpia el carrito a su estado inicial

          } else {
            Swal.fire({
              title: 'Error',
              text: `Error al realizar el pedido: ${data.errors || data.message || 'Error desconocido'}`,
              icon: 'error'
            });
          }
        } catch (error) {
          console.error('Error al enviar el pedido:', error);
          Swal.fire({
            title: 'Error',
            text: 'Error al enviar el pedido',
            icon: 'error'
          });
        }
      }
    });
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
