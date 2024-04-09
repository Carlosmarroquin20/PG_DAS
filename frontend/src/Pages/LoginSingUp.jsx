import React from 'react'
import './CSS/LoginSignup.css'

const LoginSingUp = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Iniciar Sesión</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Tu Nombre'  />
          <input type="email" placeholder='Correo Electronico'  />
          <input type="password" placeholder='Contraseña'  />
        </div>
        <button>Continuar</button>
        <p className="loginsignup-login">Ya tienes una cuenta? <span>Registrate Aqui!</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>

        </div>


      </div>
      
    </div>
  )
}

export default LoginSingUp
