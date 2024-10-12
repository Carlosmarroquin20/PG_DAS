import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';  // Importar SweetAlert2
import './ListOrders.css';

const ListOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [newState, setNewState] = useState('Pendiente');  // Para manejar el nuevo estado

  // Función para obtener todas las órdenes
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}orders/allorders`);
      const data = await response.json();

      if (data.success) {
        setAllOrders(data.orders);
      } else {
        Swal.fire('Error', 'Error al obtener las órdenes: ' + data.message, 'error');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Swal.fire('Error', 'Error al obtener las órdenes', 'error');
    }
  };

  // Función para eliminar una orden (sin token)
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}orders/delete/${orderId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.message) {
        Swal.fire('Eliminado', 'Orden eliminada exitosamente', 'success');
        fetchOrders();  // Actualiza la lista después de eliminar
      }
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      Swal.fire('Error', 'Error al eliminar la orden', 'error');
    }
  };

  // Confirmación antes de eliminar el pedido
  const confirmDeleteOrder = (orderId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId);  // Llama a la función para eliminar si el usuario confirma
      }
    });
  };

  // Función para actualizar el estado de la orden (sin token)
  const updateOrderState = async (orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}orders/updatestate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newState }),  // Solo enviamos los datos necesarios
      });
      const data = await response.json();
      if (data.message) {
        Swal.fire('Actualizado', 'Estado de la orden actualizado exitosamente', 'success');
        fetchOrders();  // Actualiza la lista después de actualizar
      }
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      Swal.fire('Error', 'Error al actualizar el estado de la orden', 'error');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Función para ver los detalles de una orden
  const viewOrderDetails = (order) => {
    setViewingOrder(order);
    setNewState(order.state);  // Inicializa el select con el estado actual de la orden
  };

  // Función para cerrar el modal de detalles
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
        <p>Estado</p>  {/* Campo para mostrar el estado */}
        <p>Ver Detalles</p>
      </div>
      <div className="listorders-allorders">
        <hr />
        {allOrders.map((order, index) => (
          <div key={index}>
            <div className="listorders-format-main listorders-format">
              <p>{order._id}</p>
              <p>{order.user?.name || 'No disponible'}</p>
              <p>Q{order.total}</p>
              <p>{order.deliveryOption}</p>
              <p>{order.state || 'No disponible'}</p> {/* Muestra el estado del pedido */}
              <button onClick={() => viewOrderDetails(order)}>Ver Detalles</button>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Modal para mostrar los detalles de la orden */}
      {viewingOrder && (
        <div className="order-details-modal">
          <h2>Detalles de la Orden</h2>
          <p>ID Orden: {viewingOrder._id}</p>
          <p>Usuario: {viewingOrder.user?.name || 'No disponible'}</p>
          <p>Email: {viewingOrder.user?.email || 'No disponible'}</p>
          <p>Total: Q{viewingOrder.total}</p>
          <p>Opción de Entrega: {viewingOrder.deliveryOption}</p>
          <p>Estado: {viewingOrder.state || 'No disponible'}</p> {/* Muestra el estado del pedido */}
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

          {/* Selector para cambiar el estado de la orden */}
          <label htmlFor="state">Cambiar Estado: </label>
          <select
            id="state"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Entregada">Entregada</option>
          </select>

          <button onClick={() => updateOrderState(viewingOrder._id)}>Actualizar Estado</button>
          <button onClick={() => confirmDeleteOrder(viewingOrder._id)}>Eliminar Pedido</button>
          <button onClick={closeOrderDetails}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default ListOrders;
