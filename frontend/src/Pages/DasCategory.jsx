import React, { useContext } from 'react';
import './CSS/DasCategory.css';
import { DasContext } from '../Context/DasContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const DasCategory = (props) => {
    const { all_product } = useContext(DasContext);

    // Obtener la categoría de los props
    const { category } = props;

    // Filtrar los productos según la categoría seleccionada
    const filteredProducts = all_product.filter(item => {
        const lowercaseCategory = category.toLowerCase();
        const lowercaseItemCategory = item.category.toLowerCase();
        return lowercaseItemCategory.includes(lowercaseCategory);
    });

    return (
        <div className='das-category'>
            <img className='dascategory-banner' src={props.banner} alt="" />
            <div className="dascategory-indexSort">
                <p>
                    <span>Mostrar 1-{filteredProducts.length}</span> de {filteredProducts.length} productos
                </p>
                <div className="dascategory-sort">
                    Ordenar por <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="dascategory-products">
                {filteredProducts.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
            <div className="dascategory-loadmore">
                Explorar más
            </div>
        </div>
    )
}

export default DasCategory;
