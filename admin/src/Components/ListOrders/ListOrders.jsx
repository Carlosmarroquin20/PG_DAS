import { useEffect, useState } from 'react';
import './ListOrders.css';

const ListOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [viewingOrder, setViewingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/allorders');
      const data = await response.json();

      if (data.success) {
        setAllOrders(data.orders);
      } else {
        alert('Error al obtener las órdenes: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error al obtener las órdenes');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const viewOrderDetails = (order) => {
    setViewingOrder(order);
  };

  const closeOrderDetails = () => {
    setViewingOrder(null);
  };

  return (
    <div className='list-orders'>
      <h1>Lista de Órdenes</h1>
      <div className="listorders-format-main">
        <p>ID Orden</p>
        <p>Usuario</p>
        <p>Total</p>
        <p>Opción de Entrega</p>
        <p>Ver Detalles</p>
      </div>
      <div className="listorders-allorders">
        <hr />
        {allOrders.map((order, index) => (
          <div key={index}>
            <div className="listorders-format-main listorders-format">
              <p>{order._id}</p>
              <p>{order.user?.name || 'No disponible'}</p>
              <p>${order.total}</p>
              <p>{order.deliveryOption}</p>
              <button onClick={() => viewOrderDetails(order)}>Ver Detalles</button>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {viewingOrder && (
        <div className="order-details-modal">
          <h2>Detalles de la Orden</h2>
          <p>ID Orden: {viewingOrder._id}</p>
          <p>Usuario: {viewingOrder.user?.name || 'No disponible'}</p>
          <p>Email: {viewingOrder.user?.email || 'No disponible'}</p>
          <p>Total: ${viewingOrder.total}</p>
          <p>Opción de Entrega: {viewingOrder.deliveryOption}</p>
          <p>Dirección: {viewingOrder.address}</p>
          <p>Teléfono: {viewingOrder.phone}</p>
          <p>Teléfono Extra: {viewingOrder.extraPhone}</p>
          <p>Comentario: {viewingOrder.comment}</p>
          <h3>Productos:</h3>
          <ul>
            {viewingOrder.products.map((item, idx) => (
              <li key={idx}>
                Producto: {item.product?.name || 'No disponible'} - Cantidad: {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={closeOrderDetails}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default ListOrders;
