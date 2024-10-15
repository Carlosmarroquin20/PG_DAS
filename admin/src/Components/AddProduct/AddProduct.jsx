import { useState } from 'react';
import Swal from 'sweetalert2';  // Importar SweetAlert2
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "foliares",
    new_price: "",
    old_price: ""
  });

  // Manejar el cambio de imagen
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Manejar el cambio de los inputs
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Confirmación antes de agregar el producto
  const confirmAddProduct = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Agregarás este producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, agregarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Add_Product();  // Llama a la función para agregar el producto si el usuario confirma
      }
    });
  };

  // Función para agregar el producto
  const Add_Product = async () => {
    // Verificar si la imagen es válida
    if (!image || !['image/jpeg', 'image/png'].includes(image.type)) {
      Swal.fire('Error', 'Debes seleccionar una imagen válida (JPG o PNG)', 'error');
      return;
    }

    let formData = new FormData();
    
    // Añadir la imagen al FormData
    formData.append('product', image);  // 'product' debe coincidir con el campo esperado por multer
  
    // Añadir los detalles del producto al FormData
    formData.append('name', productDetails.name);
    formData.append('category', productDetails.category);
    formData.append('new_price', productDetails.new_price);
    formData.append('old_price', productDetails.old_price);

    try {
      // Enviar los detalles del producto y la imagen al backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}products/addproduct`, {
        method: 'POST',
        body: formData,  // Enviar el FormData completo
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        Swal.fire('Agregado', 'El producto ha sido agregado exitosamente', 'success');
      } else {
        Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Hubo un problema al conectar con el servidor', 'error');
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Nombre del producto</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Escribe aquí' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Precio</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Escribe aquí' />
        </div>
        <div className="addproduct-itemfield">
          <p>Precio de Oferta</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Escribe aquí' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Categoría del Producto</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
          <option value="foliares">Foliares</option>
          <option value="fertilizantes">Fertilizantes</option>
          <option value="fungicidas">Fungicidas</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={confirmAddProduct} className='addproduct-btn'>AÑADIR</button> 
    </div>
  );
}

export default AddProduct;
