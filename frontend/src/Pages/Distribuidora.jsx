import React from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import StarRatingComment from '../Components/StarRatingComment/StarRatingComment'; // Importa el componente StarRatingComment
import VideoPage from '../Components/VideoPage/VideoPage';
import TioChehca from '../Components/TioChecha/TioChecha';
import CalculatorBanner from '../Components/CalculatorBanner/CalculatorBanner';

const Distribuidora = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <TioChehca />
      <StarRatingComment />
      <VideoPage />
      <CalculatorBanner />
      <NewsLetter/>

    </div>
  );
}

export default Distribuidora;
