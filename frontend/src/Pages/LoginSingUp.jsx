import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignUp = () => {
  const [state, setState] = useState("Inicio de sesión");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Función del Login al 100", formData);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error al realizar el registro:', error);
    }
  };

  const signup = async () => {
    console.log("Función del SignUp al 100", formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error al realizar el registro:', error);
    }
  };

  const handleToggleState = () => {
    setState(state === "Inicio de sesión" ? "Registrarse" : "Inicio de sesión");
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Registrarse" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Tu Nombre' />}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Correo Electrónico' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Contraseña' />
        </div>
        <button onClick={() => (state === "Inicio de sesión" ? login() : signup())}>Continuar</button>
        {state === "Inicio de sesión" 
          ? <p className="loginsignup-login">¿Crear una cuenta? <span onClick={handleToggleState}>¡Haz clic aquí!</span></p>
          : <p className="loginsignup-login">¿Ya tienes una cuenta? <span onClick={handleToggleState}>Inicia sesión aquí</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
