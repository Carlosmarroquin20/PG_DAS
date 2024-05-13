import React, { useContext } from 'react'
import { DasContext } from '../Context/DasContext'
import { useParams} from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import VideoPage from '../Components/VideoPage/VideoPage';

const Productos = () => {
    const { all_product } = useContext(DasContext);
    const { productId } = useParams();
    const Productos = all_product.find((e)=> e.id === Number(productId));

    return (
        <div>
            <Breadcrum Productos={Productos}/>
            <ProductDisplay Productos={Productos}/>
            <DescriptionBox/>
            <VideoPage />
            <RelatedProducts/>
        </div>
    )
}

export default Productos
