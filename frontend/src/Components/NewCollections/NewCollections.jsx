import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}products/newcollections`);
        if (!response.ok) throw new Error('Algo salió mal al cargar nuevas colecciones');
        const data = await response.json();
        setNew_collection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewCollections();
  }, []);

  if (loading) return <p>Cargando nuevas colecciones...</p>;
  if (error) return <p>Error al cargar: {error}</p>;

  return (
    <div className='new-collections'>
      <h1>Nuevos Productos</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
