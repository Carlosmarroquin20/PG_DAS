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
    console.log(productDetails);

    // Verifica si se ha seleccionado una imagen
    if (!image) {
      Swal.fire('Error', 'Debes seleccionar una imagen', 'error');
      return;
    }

    // Subir la imagen a Cloudinary
    let formData = new FormData();
    formData.append('product', image);

    let responseData;
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
      // Si la imagen se subió correctamente, guarda la URL en productDetails
      const product = {
        ...productDetails,
        image: responseData.image_url // URL de la imagen en Cloudinary
      };
      
      console.log(product);

      // Ahora enviar el producto con la URL de la imagen al backend
      await fetch('http://localhost:4000/api/products/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        if (data.success) {
          Swal.fire('Agregado', 'El producto ha sido agregado exitosamente', 'success');  // Alerta de éxito
        } else {
          Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');  // Alerta de error
        }
      }).catch(() => {
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');  // Alerta si no se conecta
      });
    } else {
      Swal.fire('Error', 'Hubo un problema al subir la imagen', 'error');  // Alerta de error en la imagen
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
