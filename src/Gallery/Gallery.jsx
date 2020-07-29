import React, {useEffect, useState} from 'react';
import styles from './Gallery.module.scss';
import ImageGallery from 'react-image-gallery';
import {isMobile} from 'react-device-detect';

const PHOTOS = [
  'https://lh3.googleusercontent.com/NFefiCB1rMCtv2DlvQEFcd9cSRbW_nVlRP4UEkUa3u06vVLLzu-AoLG7czJ91UddDBLP5NsebA_YEsTD5oVKTdXnPlxAzV9qtq5Ke2hK16R9bs6C4CyJLY2m7fDp95bP-uR9ip5w7Q',
  'https://lh3.googleusercontent.com/hCOazIf13KyXAvAOEEkkXKRcd-QKUA7Qv_uj4eDSdn1ffgRIY6slndLmpjGYWeAsvRKp891oZWL_qOKtwRcesaAyLBwhxD8S5NA6LG2T_SDoBiajNtzf1_p-C8MVSjbYhjTujngTSw',
  'https://lh3.googleusercontent.com/ywr--jM3Pyl1DlwNcpQIuUIJuDwrlPy-OPoTy29eiwCHJ7qI8xaorw5AqqnEbbR_be_PVgSCB3w_H7seX0YSud2g_Mup2fss_9MGKTCb6YCrVb-BRPM74kay0QzV83tIms-oCKd8Lw',
  'https://lh3.googleusercontent.com/x7jYcQBqUG6VYCFMx01KE6VAnBwEWdmY69euWm11uoTAdZh0YeVaWCyouooeBQTMF0WqW9VbsB7VGKcjNKAL3AyVYWr798jS4Q59MRedmPWxSEYWQBcHQJ3G_ifo8Nz_htE0fo7sXQ',
  'https://lh3.googleusercontent.com/AQicy83woKTVHypF8EcZ0dv6HSpphvn-b32bjNmhNC7KWKFAVWauWt94gwsblCZCVwKmfmexb_81g5Gkcm3oq-4zWgi__cRjiVCzf68mUnE0ACMIDpuomMlr1RA1-gbO-LLQuPUZVA',
  'https://lh3.googleusercontent.com/0WZcNN0CxkDi5xRDY1o92fJXD8v3PGVBUx9tHznhfq9lfqO26P1L1eRHjv8Zg-xnPZMibAZDY__SGoMrOBG-dUSfYN6E9UUrmw4_oVXE7XomSC3qyNRFpNN9ngi0J-Wv1FDIjXfJrQ',
  'https://lh3.googleusercontent.com/gfN0rxdsKfsojMptfIMSJg5LEytbKqeG7M4u4xK1HOBiEHJ8NEInxi4bHJ1oU3N4o4vn5IZbCjyHdiT7zXqSI2wbn4hjGBSuCeHGW-KqvkaXhY5Yd5kOp_hP4Ih_UsYcXxB0U63osQ',
  'https://lh3.googleusercontent.com/OOoJDc663Welc49eCsG55ddJjiAdVLkyx6vzuBjvqZyTFPESKh4kfgZXMd7Begk_ODFXZDT3mnq9maDnUEaBQQDpYlSPuFuBfnKe3IMgjmP9snqRImKM4iMO2NKhjbDETmAJxihFVQ',
  'https://lh3.googleusercontent.com/aHfkdTX9vx4EHL_OFlbSVoNykb5KnBMIlrtWJiTsrmrZ-fwDQFslVBq6hLPKGycHReTo99XmElCY0YzLVP7LI3lkPYY7c3l7fuZv0lSGZoX2VxsiS8RScamwUT11xCXfF2YbjPaXFA',
];

const Gallery = (props) => {
  const images = PHOTOS.map((url) => ({
    original: `${url}=w1024`,
    thumbnail: `${url}=w100`,
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
