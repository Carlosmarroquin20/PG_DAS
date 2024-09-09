// src/Pages/Admin/Admin.jsx
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import ListOrders from '../../Components/ListOrders/ListOrders';
import OrderStatistics from '../../Components/Estadisticas/OrderStatistics';

const Admin = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirige al login si no está autenticado
  }

  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/orders" element={<ListOrders />} />
        <Route path="/stats" element={<OrderStatistics />} />
      </Routes>
    </div>
  );
};

export default Admin;
