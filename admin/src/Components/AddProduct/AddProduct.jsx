import React, {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'


const AddProduct = () => {

  const [image,setImage] = useState(false);

  const imageHandler = (e) =>{
      setImage(e.target.files[0]);

  } 
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Nombre del producto</p>
        <input type="text" name='name' placeholder='Escribe aqui' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Precio</p>
          <input type="text" name='old_price' placeholder='Escribe aqui' />    
        </div>
        <div className="addproduct-itemfield">
          <p>Precio de Oferta</p>
          <input type="text" name='new_price' placeholder='Escribe aqui' />    
        </div>   
      </div>
      <div className="addproduct-itemfield">
        <p>Categoria del Producto</p>
        <select name='category' className='add-product-selector'>
          <option value="foliares">Foliares</option>
          <option value="fertilizantes">Fertilizantes</option>
          <option value="fungicidas">Fungicidas</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>  
      </div>
      <button className='addproduct-btn'>AÑADIR</button> 
    </div>
  )
}

export default AddProduct
