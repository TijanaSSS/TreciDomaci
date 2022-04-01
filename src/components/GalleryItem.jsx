import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({ url, title }) => {
  return (
    <li>
      <img src={url} alt={title} />
    </li>
  );
}

GalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default GalleryItem;
