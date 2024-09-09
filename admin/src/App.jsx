// src/App.jsx
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import Login from './Components/Login/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Navbar />
      {!isAuthenticated ? (
        <Login onLogin={setIsAuthenticated} />
      ) : (
        <Admin isAuthenticated={isAuthenticated} />  // Pasamos el estado de autenticación
      )}
    </div>
  );
};

export default App;
