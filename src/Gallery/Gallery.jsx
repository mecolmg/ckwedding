import React, {useEffect, useState} from 'react';
import styles from './Gallery.module.scss';
import {WEDDING_IMAGES} from './imagesData';
import ImageGallery from 'react-image-gallery';
import {isMobile} from 'react-device-detect';

const Gallery = (props) => {
  const images = WEDDING_IMAGES.map((image) => ({
    original: `${image.url}=w1024`,
    thumbnail: `${image.url}=w100`,
  }));

  return (
    <div className={styles.gallery}>
      <ImageGallery
        items={images}
        autoPlay={true}
        thumbnailPosition={isMobile ? 'bottom' : 'right'}
        lazyLoad={true}
      />
    </div>
  );
};

export default Gallery;
