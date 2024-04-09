import React, { useContext } from 'react'
import { DasContext } from '../Context/DasContext'
import { useParams} from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const Productos = () => {
    const { all_product } = useContext(DasContext);
    const { productId } = useParams();
    const Productos = all_product.find((e)=> e.id === Number(productId));

    return (
        <div>
            <Breadcrum Productos={Productos}/>
        </div>
    )
}

export default Productos
