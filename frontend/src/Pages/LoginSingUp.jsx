import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
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

  const validateForm = () => {
    const { username, password, email } = formData;

    // Validación para el registro
    if (state === "Registrarse") {
      if (!username || !email || !password) {
        Swal.fire({
          title: 'Error',
          text: 'Todos los campos son obligatorios para registrarse',
          icon: 'warning',
        });
        return false;
      }
      // Validación de formato de email
      if (!/\S+@\S+\.\S+/.test(email)) {
        Swal.fire({
          title: 'Error',
          text: 'El formato del correo electrónico no es válido',
          icon: 'warning',
        });
        return false;
      }
    }

    // Validación para el login (solo email y password)
    if (state === "Inicio de sesión") {
      if (!email || !password) {
        Swal.fire({
          title: 'Error',
          text: 'Correo electrónico y contraseña son obligatorios para iniciar sesión',
          icon: 'warning',
        });
        return false;
      }
      // Validación de formato de email
      if (!/\S+@\S+\.\S+/.test(email)) {
        Swal.fire({
          title: 'Error',
          text: 'El formato del correo electrónico no es válido',
          icon: 'warning',
        });
        return false;
      }
    }

    return true;
  };

  const login = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('userId', responseData.userId); // Guarda el userId en localStorage
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
        }).then(() => {
          window.location.replace("/");
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: responseData.errors || 'Error al iniciar sesión',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error de conexión al iniciar sesión',
        icon: 'error',
      });
    }
  };

  const signup = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('userId', responseData.userId); // Guarda el userId en localStorage
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Te has registrado correctamente',
          icon: 'success',
        }).then(() => {
          window.location.replace("/");
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: responseData.errors || 'Error al registrarse',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error al realizar el registro:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error de conexión al registrarse',
        icon: 'error',
      });
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
          {state === "Registrarse" && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Tu Nombre'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Correo Electrónico'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Contraseña'
          />
        </div>
        <button onClick={() => (state === "Inicio de sesión" ? login() : signup())}>Continuar</button>
        {state === "Inicio de sesión" ? (
          <p className="loginsignup-login">
            ¿Crear una cuenta? <span onClick={handleToggleState}>¡Haz clic aquí!</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            ¿Ya tienes una cuenta? <span onClick={handleToggleState}>Inicia sesión aquí</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
