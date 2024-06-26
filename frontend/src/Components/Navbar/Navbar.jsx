import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';

import logo from '../Assets/DAS_logo.png';
import cart_icon from '../Assets/Carrito.png';
import { Link } from 'react-router-dom';
import { DasContext } from '../../Context/DasContext';
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu, setMenu] = useState("Inicio");
    const {getTotalCartItems}= useContext(DasContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }


    return (
        <div className='navbar'>
            <div className="nav-logo">
                <Link to='/' onClick={() => setMenu("Inicio")}> {/* Enlace al inicio */}
                    <img src={logo} alt="Inicio" /> {/* Imagen del logo */}
                </Link>
                <p>DISTRIBUIDORA AGRICOLA SANDOVAL</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => setMenu("Inicio")}><Link style={{ textDecoration: 'none' }} to='/'>Inicio</Link> {menu === "Inicio" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("Fertilizantes")}><Link style={{ textDecoration: 'none' }} to='/fertilizantes'>Fertilizantes</Link> {menu === "Fertilizantes" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("Foliares")}><Link style={{ textDecoration: 'none' }} to='/foliares'>Foliares</Link> {menu === "Foliares" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("Fungicidas")}><Link style={{ textDecoration: 'none' }} to='/fungicidas'>Fungicidas</Link> {menu === "Fungicidas" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>} 
                <Link to='/carrito'><img src={cart_icon} alt="Carrito" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
