import React, {useEffect, useState} from 'react';
import Footer from 'Footer/Footer.jsx';
import Navigation from 'Navigation/Navigation.jsx';
import fetch from 'node-fetch';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import styles from './RegistryView.module.scss';
import Fab from '@material-ui/core/Fab';
import LaunchIcon from '@material-ui/icons/Launch';
import Grow from '@material-ui/core/Grow';
import registries from './registries';

const BASE_REGISTRY_URL =
  'https://registry-item-gateway.regsvcs.theknot.com/items';
const QUERY_PARAMS = {
  limit: 1000,
  priceRange: '',
  memberId: '3295EBD4-5A47-4100-83D0-064CE078704E',
  showCash: false,
  registryStatusFilter: 'active,visible',
  sort: 'priceCents-desc',
};
const QUERY_PARAMS_STRING = Object.keys(QUERY_PARAMS)
  .map((key) => `${key}=${QUERY_PARAMS[key]}`)
  .join('&');
const REGISTRY_URL = `${BASE_REGISTRY_URL}?${QUERY_PARAMS_STRING}`;

const BASE_REGISTRY_REDIRECTOR_URL =
  'https://track-registry.theknot.com/track/view';

function RegistryView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(REGISTRY_URL)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data);
      });
  }, []);

  return (
    <>
      <Navigation />
      <div className={styles.registries}>
        {registries.map((registry, index) => (
          <Grow in={true} timeout={index * 500} key={index}>
            <Registry registry={registry} />
          </Grow>
        ))}
      </div>
      <Collapse in={items.length > 0} timeout={1000}>
        <div className={styles.registryItems}>
          {items.map((item, index) => (
            <RegistryItem item={item} key={index} />
          ))}
        </div>
      </Collapse>
      <Button
        color="primary"
        variant="contained"
        href="https://registry.theknot.com/katelyn-salvatore-colm-gallagher-september-2020-va/32172350"
        target="_blank"
        rel="noopener noreferrer"
      >
        View this registry on theknot.com
      </Button>
      <Footer />
    </>
  );
}

function Registry({registry}) {
  return (
    <Card className={styles.registry}>
      <CardActionArea
        className={styles.registryAction}
        href={getRegistryUrl(registry)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          className={styles.registryImage}
          image={registry.retailer.fullLogoImageUrl}
        />
      </CardActionArea>
    </Card>
  );
}

function RegistryItem({item}) {
  return (
    <Card className={styles.registryItem}>
      <CardActionArea
        className={styles.registryItemAction}
        href={getItemUrl(item)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          className={styles.registryItemImage}
          image={item.imageUrls[0]}
        >
          <Button
            className={styles.registryItemBadge}
            color={
              item.isAvailable && !item.isFulfilled ? 'secondary' : 'default'
            }
            variant="contained"
          >
            {item.isFulfilled
              ? 'Fulfilled'
              : item.isAvailable
              ? formatItemPrice(item)
              : 'Out of Stock'}
          </Button>
          <Fab className={styles.registryItemCta} color="primary" size="medium">
            <LaunchIcon />
          </Fab>
        </CardMedia>
        <CardContent className={styles.registryItemContent}>
          <Typography
            className={styles.registryItemName}
            gutterBottom
            variant="subtitle1"
            component="h2"
          >
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.retailerName}
          </Typography>
          {item.numRequested <= 1 || (
            <Typography variant="body2" color="primary" component="p">
              Need {Math.max(0, item.numRequested - item.numReceived)} of{' '}
              {item.numRequested}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function getRegistryUrl(registry) {
  return `${BASE_REGISTRY_REDIRECTOR_URL}?r=${registry.id}&rt=${registry.retailer.id}&a=994&st=RegistryProfile&ss=LinkedRegistries&sp=Logo&lt=RetailerGVR&eventType=1`;
}

function getItemUrl(item) {
  const registry = registries.find(
    (reg) => reg.registryUuid.toUpperCase() === item.registryId.toUpperCase()
  );
  const registryId = registry ? registry.id : '';
  return `${BASE_REGISTRY_REDIRECTOR_URL}?r=${registryId}&rt=${item.retailerId}&rtprodco=${item.productId}&a=994&st=RegistryProfile&ss=ItemCard&sp=ProductImage&lt=RetailerGVR&eventType=1`;
}

function formatItemPrice(item) {
  return `$${Math.round(item.priceCents / 100)}`;
}

export default RegistryView;
