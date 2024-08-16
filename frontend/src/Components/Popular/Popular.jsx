import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}products/popularinfoliares`);
        if (!response.ok) throw new Error('Failed to fetch popular products');
        const data = await response.json();
        setPopularProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading popular products: {error}</p>;

  return (
    <div className='popular'>
      <h1>LO ULTIMO EN FOLIARES</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
}

export default Popular;
