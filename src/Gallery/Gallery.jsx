import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.scss";
import {db} from "../firebase";
import ImageGallery from "react-image-gallery";
import Button from "@material-ui/core/Button";
import { isMobile } from "react-device-detect";

const Gallery = (props) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    db.collection('photos').get().then((snapshot) => {
      setImages(snapshot.docs.map((doc) => {
        const url = doc.get('url');
        console.log(url);
        return {
          original: `${url}=w1024`,
          thumbnail: `${url}=w100`,
        };
      }));
    })
  }, []);

  return (
    <div className={styles.gallery}>
      <ImageGallery
        items={images}
        autoPlay={true}
        thumbnailPosition={isMobile ? "bottom" : "right"}
        lazyLoad={true}
      />
      <Button
        className={styles.photographerLink}
        variant="contained"
        color="primary"
        href="https://birdsofafeatherphotography.passgallery.com/-kcmicrowedding/gallery"
      >
        View Photographer Gallery
      </Button>
    </div>
  );
};

export default Gallery;
