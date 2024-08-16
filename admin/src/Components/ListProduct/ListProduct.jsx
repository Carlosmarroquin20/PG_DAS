import React, { useEffect, useState } from 'react';
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
    await fetch('http://localhost:4000/api/products/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data); });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/api/products/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });
    await fetchInfo();
  }

  const editProduct = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      old_price: product.old_price,
      new_price: product.new_price,
      category: product.category
    });
  }

  const saveProduct = async (id) => {
    await fetch('http://localhost:4000/api/products/updateproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...formData })
    });
    setEditingProduct(null);
    await fetchInfo();
  }

  const cancelEdit = () => {
    setEditingProduct(null);
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
                <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Eliminar" />
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
