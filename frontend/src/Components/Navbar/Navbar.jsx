import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/DAS_logo.png';
import cart_icon from '../Assets/Carrito.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("Inicio");

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <Link to='/' onClick={() => setMenu("Inicio")}> {/* Enlace al inicio */}
                    <img src={logo} alt="Inicio" /> {/* Imagen del logo */}
                </Link>
                <p>DISTRIBUIDORA AGRICOLA SANDOVAL</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("Inicio")}><Link style={{ textDecoration: 'none' }} to='/'>Inicio</Link> {menu === "Inicio" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("Fertilizantes")}><Link style={{ textDecoration: 'none' }} to='/fertilizantes'>Fertilizantes</Link> {menu === "Fertilizantes" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("Foliares")}><Link style={{ textDecoration: 'none' }} to='/foliares'>Foliares</Link> {menu === "Foliares" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("Fungicidas")}><Link style={{ textDecoration: 'none' }} to='/fungicidas'>Fungicidas</Link> {menu === "Fungicidas" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/carrito'><img src={cart_icon} alt="Carrito" /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
    );
}

export default Navbar;
