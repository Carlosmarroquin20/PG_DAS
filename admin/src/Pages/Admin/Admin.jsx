
import './Admin.css'
import  Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import ListOrders from '../../Components/ListOrders/ListOrders'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path='/orders' element={<ListOrders/>}/>
      </Routes>

    </div>
  )
}

export default Admin
