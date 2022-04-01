import React from 'react';
import PropTypes from 'prop-types';
import GalleryItem from './GalleryItem';
import Loader from './Loader';
import NotFound from './NotFound';

const Gallery = ({ data, isLoading }) => {
  let results;

  if (isLoading) {

    results = <Loader />;
    
  } else {
    
    if (Array.isArray(data) && data.length > 0) {
      results = data.map((photo, index) => (
        <GalleryItem
          key={index}
          url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          title={photo.title}
        />
      ));
    } else if (!isLoading) {
      // Assign Not Found list item if no photos are provided
      results = <NotFound />;
    }
  }
  
  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {results}
      </ul>
    </div>
  );
}

Gallery.propTypes = {
  data: PropTypes.array,
  isloading: PropTypes.bool
};

export default Gallery;
