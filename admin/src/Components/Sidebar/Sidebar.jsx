import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from  '../../assets/Product_list_icon.svg'
import orders from '../../assets/Orders_Admin.svg'
import faq from '../../assets/FAQ_Admin.svg' 
import info from '../../assets/Info_Admin.svg'  


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Añadir Producto</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Lista de Productos</p>
            </div>
        </Link>
        <Link to={'/orders'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={orders} alt="" />
                <p>Pedidos</p>
            </div>
        </Link>
        <Link to={'/faq'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={faq} alt="" />
                <p>Preguntas Frecuentes</p>
            </div>
        </Link> 
        <Link to={'/info'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={info} alt="" />
                <p>Información</p>
            </div>
        </Link>
        <Link to={'/stats'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={info} alt="" />
                <p>Estadisticas</p>
            </div>
        </Link>     

    </div>
  )
}

export default Sidebar
