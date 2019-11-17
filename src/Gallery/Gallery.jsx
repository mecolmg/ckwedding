import React from "react";
import request from "request";
import styles from "./Gallery.module.scss";
import ImageGallery from "react-image-gallery";
import { isMobile } from "react-device-detect";

// See: https://link.medium.com/dAn9pIr6z0.
const PHOTOS_API_BASE_URL = "https://google-photos-album-demo.glitch.me/";
// Engagement Photos Album: https://photos.app.goo.gl/ehAVnyuXHsxPwjnY9.
const GOOGLE_PHOTOS_ALBUM_ID = "ehAVnyuXHsxPwjnY9";
const GET_PHOTOS_URL = `${PHOTOS_API_BASE_URL}${GOOGLE_PHOTOS_ALBUM_ID}`;

class Gallery extends React.PureComponent {
  state = {
    images: [],
  };

  async componentDidMount() {
    request.get(GET_PHOTOS_URL, (error, response) => {
      if (error) return;
      const responseData = JSON.parse(response.body);
      const images = responseData.map((url: string) => ({
        original: `${url}=w1024`,
        thumbnail: `${url}=w100`,
      }));
      this.setState({ images });
    });
  }

  render() {
    return (
      <div className={styles.gallery}>
        {this.state.images.length > 0 ? (
          <ImageGallery
            items={this.state.images}
            autoPlay={true}
            thumbnailPosition={isMobile ? "bottom" : "right"}
            lazyLoad={true}
          />
        ) : null}
      </div>
    );
  }
}

export default Gallery;
