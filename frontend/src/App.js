import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Distribuidora from './Pages/Distribuidora';
import DasCategory from './Pages/DasCategory';
import Productos from './Pages/Productos';
import Carrito from './Pages/Carrito';
import LoginSingUp from './Pages/LoginSingUp';
import Footer from './Components/Footer/Footer';
import banner_ferti from './Components/Assets/banner_fertilizantes.png'
import banner_foliar from './Components/Assets/banner_foliares.png'
import banner_fungi from './Components/Assets/banner_fungicidas.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Distribuidora/>}/>
        <Route path='/Fertilizantes' element={<DasCategory banner={banner_ferti} category="Fertilizantes"/>}/>
        <Route path='/Foliares' element={<DasCategory banner={banner_foliar} category="Foliares"/>}/>
        <Route path='/Fungicidas' element={<DasCategory banner={banner_fungi} category="Fungicidas"/>}/>
        <Route path="/Productos" element={<Productos/>}>
          <Route path=':productId' element={<Productos/>}/>
        </Route>
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/login' element={<LoginSingUp/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
