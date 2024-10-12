import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';  // Importar SweetAlert2
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import edit_icon from '../../assets/edit_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: ''
  });

  const fetchInfo = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}products/allproducts`)
      .then((res) => res.json())
      .then((data) => { setAllProducts(data); });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  // Confirmación antes de eliminar el producto
  const confirmRemoveProduct = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(id);  // Llama a la función para eliminar si el usuario confirma
      }
    });
  };

  // Función para eliminar el producto
  const removeProduct = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}products/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });

    Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');  // Mostrar mensaje de éxito

    await fetchInfo();
  }

  // Función para editar un producto
  const editProduct = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      old_price: product.old_price,
      new_price: product.new_price,
      category: product.category
    });
  }

  // Función para guardar el producto
  const saveProduct = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}products/updateproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...formData })
    });

    Swal.fire('Guardado', 'El producto ha sido actualizado exitosamente', 'success');  // Mostrar mensaje de éxito

    setEditingProduct(null);
    await fetchInfo();
  }

  // Función para cancelar la edición
  const cancelEdit = () => {
    setEditingProduct(null);
    Swal.fire('Cancelado', 'La edición ha sido cancelada', 'info');  // Mostrar mensaje de cancelación
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='list-product'>
      <h1>Lista de Productos</h1>
      <div className="listproduct-format-main">
        <p>Productos</p>
        <p>Nombre</p>
        <p>Precio</p>
        <p>Precio Oferta</p>
        <p>Categoria</p>
        <p>Editar</p>
        <p>Eliminar</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index}>
            {editingProduct === product.id ? (
              <div className="edit-form">
                <input name="name" value={formData.name} onChange={handleChange} />
                <input name="old_price" value={formData.old_price} onChange={handleChange} />
                <input name="new_price" value={formData.new_price} onChange={handleChange} />
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="foliares">Foliares</option>
                  <option value="fertilizantes">Fertilizantes</option>
                  <option value="fungicidas">Fungicidas</option>
                </select>
                <button className="save-button" onClick={() => saveProduct(product.id)}>Guardar</button>
                <button className="cancel-button" onClick={cancelEdit}>Cancelar</button>
              </div>
            ) : (
              <div className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => editProduct(product)} className='listproduct-edit-icon' src={edit_icon} alt="Editar" />
                <img onClick={() => confirmRemoveProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Eliminar" />
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListProduct;
