import React from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import StarRatingComment from '../Components/StarRatingComment/StarRatingComment'; // Importa el componente StarRatingComment
import VideoPage from '../Components/VideoPage/VideoPage';

const Distribuidora = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <StarRatingComment />
      <VideoPage />
      <NewsLetter/>
    </div>
  );
}

export default Distribuidora;
