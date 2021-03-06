import React, {useState} from 'react';
import ComfortSuitesLogo from './images/ComfortSuitesLogo.png';
import MarriottLogo from './images/MarriottLogo.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './HotelsInfo.module.scss';
import mapStyles from './map_styles.json';
import {compose, lifecycle, withProps} from 'recompose';
import {useTheme} from '@material-ui/core/styles';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const MAPS_API_KEY = 'AIzaSyDGOgMb65UUKxKAUrm4tZNYJNPa5Dqxbf8';

export function Splash() {
  return <div className={styles.splash}></div>;
}

export function HotelsInfo(props) {
  const [marriottDialogOpen, setMarriottDialogOpen] = useState(false);
  const [comfortSuitesDialogOpen, setComfortSuitesDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const classNames =
    styles.hotelsInfo + (props.className ? ` ${props.className}` : '');
  return (
    <div className={classNames}>
      <h1 className={styles.title}>Hotel Info</h1>
      <div className={styles.hotelsContainer}>
        <Hotel
          name="Comfort Suites"
          address={'80 Prosperity Ave\nLeesburg, VA, 20175'}
          mapsLink="https://goo.gl/maps/KKAgCeakvqvwo8Uf8"
          link="https://www.choicehotels.com/reservations/groups/IA67G8"
          logo={ComfortSuitesLogo}
          viewMoreAction={() => setComfortSuitesDialogOpen(true)}
          hidden
        />
        <Hotel
          name="Marriott - SpringHill Suites"
          address={'20065 Lakeview Center Plaza\nAshburn, Virginia 20147'}
          mapsLink="https://goo.gl/maps/YWEChCQBNbNHP1GQ7"
          link="https://www.marriott.com/events/start.mi?id=1570632297188&key=GRP"
          logo={MarriottLogo}
          viewMoreAction={() => setMarriottDialogOpen(true)}
          hidden
        />
        <div>
          <h2>TBD</h2>
          <p>
            Now that the reception has been postponed, we're actively working
            with our previously reserved hotels to schedule new accommodations
            for the August 28th, 2021 wedding.
          </p>
          <p>
            Sign up for email updates on the home page to stay informed on
            changes.
          </p>
        </div>
      </div>
      <Dialog
        open={comfortSuitesDialogOpen}
        maxWidth="md"
        fullScreen={fullScreen}
        onClose={() => setComfortSuitesDialogOpen(false)}
      >
        <DialogTitle>Comfort Suites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Room Options</h2>
            <p>
              <b>King Studio Suites</b> - One king bed and a pull out sleeper
              sofa, mini refrigerator, microwave, and coffee maker.
              <br />
              Arrival on September 25<sup>th</sup>, 2020 and departure on
              September 27<sup>th</sup>, 2020
              <br />
              $135 per night plus tax
            </p>
            <p>
              <b>Queen Studio Suites</b> - Two queen beds and a pull out sleeper
              sofa, mini refrigerator, microwave and coffee maker.
              <br />
              Arrival on September 25<sup>th</sup>, 2020 and departure on
              September 27<sup>th</sup>, 2020
              <br />
              $135 per night plus tax
            </p>
            <h2>Shuttle Service</h2>
            <p>
              <b>Airport Shuttle</b> - Comfort Suites provides a complimentary
              shuttle to and from Dulles Airport for any guests that may be
              flying in. The shuttle runs from 7 AM - 10 PM daily upon request.
            </p>
            <p>
              <b>Wedding Shuttle</b> - Comfort Suites will also provide one
              complimentary 14 or 12 passenger van to and from Whitehall Estate
              with 10 guaranteed rooms.
            </p>
            <p>
              <b>Rental Cars</b> - If you&apos;d prefer a little more freedom,
              you can rent a car from Enterprise Rental Car in Leeseburg for a
              discounted rate. The rate code is{' '}
              <b className={styles.rateCode}>L16V68G / COM</b>. Call
              703-777-5800 to book.
            </p>
            <h2>How to Book</h2>
            <p>
              To book your room, you can call the hotel directly at 703-669-1650
              and ask for the Salvatore Wedding room block. You can also{' '}
              <a href="https://www.choicehotels.com/reservations/groups/IA67G8">
                book now online
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setComfortSuitesDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={marriottDialogOpen}
        maxWidth="md"
        fullScreen={fullScreen}
        onClose={() => setMarriottDialogOpen(false)}
      >
        <DialogTitle>Marriott - SpringHill Suites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Room Options</h2>
            <p>
              <b>King Suite</b> - One king bed and a trundle bed, mini
              refrigerator, microwave, and coffee maker.
              <br />
              Starts on September 24<sup>th</sup>, 2020 and ends on September 28
              <sup>th</sup>, 2020
              <br />
              $129 per night plus tax
            </p>
            <p>
              <b>Queen Suite</b> - Two queen beds and a trundle bed, mini
              refrigerator, microwave, and coffee maker.
              <br />
              Starts on September 24<sup>th</sup>, 2020 and ends on September 28
              <sup>th</sup>, 2020
              <br />
              $149 per night plus tax
            </p>
            <h2>Breakfast</h2>
            <p>Complimentary buffet breakfast is provided every day.</p>
            <h2>Shuttle Service</h2>
            <p>
              <b>Airport Shuttle</b> - SpringHill Suites provides a
              complimentary shuttle to and from Dulles Airport for any guests
              that may be flying in.
            </p>
            <h2>How to Book</h2>
            <p>
              The last day to book is August 28<sup>th</sup>, 2020. To book your
              room, you can call the hotel directly at 703-723-9300 and ask for
              the Salvatore-Gallagher Wedding room block. You can also{' '}
              <a
                href="https://www.marriott.com/events/start.mi?id=1570632297188&key=GRP"
                target="_blank"
                rel="noopener noreferrer"
              >
                book now online
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setMarriottDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Hotel({
  name,
  logo,
  address,
  link,
  mapsLink,
  viewMoreAction,
  ...props
}) {
  return (
    <div className={styles.hotel} {...props}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={logo} alt={`${name} Logo`} className={styles.hotelImage} />
      </a>
      <p>{name}</p>
      <a href={mapsLink} target="_blank" rel="noopener noreferrer">
        <div>
          {address.split('\n').map((x, index) => (
            <div key={index}>{x}</div>
          ))}
        </div>
      </a>
      <div className={styles.hotelButtons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => viewMoreAction()}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export const HotelsAndHousesMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAPS_API_KEY}`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  withScriptjs,
  lifecycle({
    componentWillMount() {
      const refs = {};
      const markers = [
        {
          name: 'Whitehall Estate',
          position: {lat: 39.1118773, lng: -77.8251408},
          link: 'https://goo.gl/maps/XG5LsDTdDt3V7wM49',
        },
        {
          name: "The Gallaghers' House",
          position: {lat: 39.0168022, lng: -77.503797},
          link: 'https://goo.gl/maps/ZPRGbeqaTYG2yHRR9',
        },
        {
          name: "The Salvatores' House",
          position: {lat: 39.0585488, lng: -77.4752764},
          link: 'https://goo.gl/maps/oUUsEfGoT6GZGp8z8',
        },
        // {
        //   name: "Comfort Suites",
        //   position: { lat: 39.104933, lng: -77.548374 },
        //   link: "https://goo.gl/maps/zYoyV7xnGgSj76WG6",
        // },
        // {
        //   name: 'Marriott - SpringHill Suites',
        //   position: {lat: 39.0608259, lng: -77.4528328},
        //   link: 'https://goo.gl/maps/YWEChCQBNbNHP1GQ7',
        // },
      ];
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(marker.position);
      });

      this.setState({
        bounds,
        center: bounds.getCenter(),
        markers,
        onMapMounted: (ref) => {
          refs.map = ref;
          if (refs.map) {
            refs.map.fitBounds(bounds);
            this.setState({zoom: refs.map.getZoom() - 1});
          }
        },
        zoom: 11,
      });
    },
  }),
  withGoogleMap
)((props) => {
  const markers = props.markers.map((marker, index) => {
    return (
      <MarkerWithLabel
        key={index}
        position={marker.position}
        labelAnchor={new window.google.maps.Point(0, 0)}
        labelClass={styles.markerLabel}
        onClick={() => window.open(marker.link)}
        zIndex={marker.zIndex}
      >
        <Paper className={styles.markerLabelContent}>{marker.name}</Paper>
      </MarkerWithLabel>
    );
  });

  return (
    <GoogleMap
      ref={props.onMapMounted}
      zoom={props.zoom}
      center={props.center}
      defaultOptions={{
        styles: mapStyles,
      }}
    >
      {markers}
    </GoogleMap>
  );
});

export default HotelsInfo;
