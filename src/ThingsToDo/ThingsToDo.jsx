import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs } from "react-google-maps";
import styles from "./ThingsToDo.module.scss";

const PLACE_IDS = [
  "ChIJr3rpGagOtokRCp4Fxe8u3c8", // Bluemont Vineyard
];

function ThingsToDo() {
  return (
    <div className={styles.thingsToDo}>
      <h1 className={styles.title}>Things to Do</h1>
      <ThingsToDoContent />
    </div>
  );
}

const mapRef = React.createRef();
const ThingsToDoContent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_PLACES_API_KEY}&libraries=places`,
    loadingElement: <div></div>,
  }),
  withScriptjs
)(() => {
  const [places, setPlaces] = useState([]);
  const attributions = React.createRef();

  const getPlaces = async () => {
    const placeService = new window.google.maps.places.PlacesService(
      attributions.current
    );
    const requests = PLACE_IDS.map((placeId) => {
      return new Promise((resolve, reject) => {
        placeService.getDetails({ placeId }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
          } else {
            reject(`Recieved PlaceServiceStatus: ${status}`);
          }
        });
      });
    });
    const fetchedPlaces = await Promise.all(requests);
    console.log(fetchedPlaces);
    setPlaces(fetchedPlaces);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div>
      {places.map((place) => (
        <ThingToDo place={place} key={place.place_id}></ThingToDo>
      ))}
      <div ref={attributions}></div>
    </div>
  );
});

const ThingToDo = ({ place: { name, photos } }) => {
  return <div>{name}</div>;
};

export default ThingsToDo;
