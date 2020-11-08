import React, { useCallback, useEffect, useState } from "react";
import styles from "./Gallery.module.scss";
import { db } from "../firebase";
import PhotoGallery from "react-photo-gallery";
import Button from "@material-ui/core/Button";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { isMobile } from "react-device-detect";

const Gallery = (props) => {
  const [photos, setPhotos] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  useEffect(() => {
    db.collection("photos")
      .get()
      .then((snapshot) => {
        setPhotos(
          snapshot.docs.map((doc) => {
            const url = doc.get("url");
            return {
              src: url,
              placeholderSrc: `${url}=w100`,
              thumbnailSrc: `${url}=w480`,
              lightboxSrc: isMobile ? `${url}=w1024` : `${url}=w1920`,
              width: doc.get("width"),
              height: doc.get("height"),
            };
          })
        );
      });
  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const mainImg = photos[currentImage];
  const nextImg = photos[(currentImage + photos.length + 1) % photos.length];
  const prevImg = photos[(currentImage + photos.length - 1) % photos.length];

  return (
    <div className={styles.gallery}>
      <PhotoGallery
        photos={photos}
        onClick={openLightbox}
        renderImage={LazyImage}
        margin={4}
      />
      {viewerIsOpen && (
        <Lightbox
          mainSrc={mainImg.lightboxSrc}
          nextSrc={nextImg.lightboxSrc}
          prevSrc={prevImg.lightboxSrc}
          mainSrcThumbnail={mainImg.thumbnailSrc}
          nextSrcThumbnail={nextImg.thumbnailSrc}
          prevSrcThumbnail={prevImg.thumbnailSrc}
          onCloseRequest={() => closeLightbox()}
          onMovePrevRequest={() =>
            setCurrentImage((currentImage - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % photos.length)
          }
          reactModalProps={{
            onAfterOpen: () => {
              document.body.style.overflow = "hidden";
            },
            onAfterClose: () => {
              document.body.removeAttribute("style");
            },
          }}
        />
      )}
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

const LazyImage = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
  key,
}) => {
  const imgStyle = { display: "block" };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }
  const imgWithClick = { cursor: "pointer" };

  const handleClick = (event) => {
    onClick(event, { photo, index });
  };

  return (
    <LazyLoadImage
      key={key}
      height={photo.height}
      src={photo.thumbnailSrc}
      placeholderSrc={photo.placeholderSrc}
      delayTime={100}
      effect="opacity"
      width={photo.width}
      onClick={onClick ? handleClick : null}
      wrapperClassName={styles.lazyImageWrapper}
      style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
    />
  );
};

export default Gallery;
