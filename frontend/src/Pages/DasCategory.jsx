import React, { useContext } from 'react'
import './CSS/DasCategory.css'
import { DasContext } from '../Context/DasContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const DasCategory = (props) => {
  const { all_product } = useContext(DasContext);

  // Obtener la categoría de los props
  const { category } = props;

  return (
    <div className='das-category'>
      <img className='dascategory-banner'  src={props.banner} alt="" />
      <div className="dascategory-indexSort">
        <p>
          <span>Mostar 1-12</span> de 36 productos
        </p>
        <div className="dascategory-sort">
          Ordernar por <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="dascategory-products">
        {all_product.map((item, i) => {
          // Comparar la categoría del producto con la categoría de los props
          if (category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="dascategory-loadmore">
        Explorar mas
      </div>

    </div>
  )
}

export default DasCategory;
