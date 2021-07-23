import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs } from "react-google-maps";
import MaterialCard from "@material-ui/core/Card";
import MaterialCardActionArea from "@material-ui/core/CardActionArea";
import MaterialCardContent from "@material-ui/core/CardContent";
import MaterialChip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import styles from "./ThingsToDo.module.scss";

const PLACE_IDS = [
  "ChIJqaIkFFk5tokRpYHpKj1w2Io", // One Loudoun
  "ChIJUWpNFrE9tokRMm-NSyUt_qY", // Village at Leesburg
  "ChIJz8yB77MOtokR0njOEvs6skI", // Bear Chase Brewing
  "ChIJr3rpGagOtokRCp4Fxe8u3c8", // Bluemont Vineyard
  "ChIJ3Z1f1l85tokRJsoVsAeETbE", // Topgolf
  "ChIJcyBkMutGtokRqMoMaOdxXrE", // Udvar-Hazy Center
  "ChIJe-SJPiIitokRwaj-kuc8aZI", // Vanish
  "ChIJjXLZ8UAitokRRhJqpUE1pko", // Roots
  "ChIJX4dYZ0gJtokRATlcGzswYMc", // Snickers Gap Trailhead
  "ChIJbxIzFkcJtokRV2Eo3W3a0pY", // Raven Rocks Trailhead
  "ChIJid-3BbA5tokRs6oQZssKxWc", // Sportrock
  "ChIJVUOiq9cXtokRHipC1yMuifI", // Shoe's Cup and Cork
  "ChIJlyBV9dYXtokRX0v_mXudnjs", // SideBar
  "ChIJKdaBWkVAtokRX3_NVcsfDZM", // Solace
  "ChIJLV2H2iQ5tokR89EbaSK7mCE", // Old Ox
  "ChIJO5jS6asOtokRXwOUDE5czNQ", // Dirt Farm Brewing
  "ChIJxZUhF9Y-tokRqKhILOLVv0A", // Lost Rhino Brewing
  "ChIJF_WFCVshtokRZb5dg60fD40", // Tarara Winery
  "ChIJNylRPEQQtokRSfCvZes7KTM", // Magnolias
  "ChIJN2LfB5kPtokRYWV8JDVe7OI", // Henway Hard Cider
  "ChIJIe3Ov1g5tokRuAN0fLXc3_A", // One Loudoun Farmers Market
];

function ThingsToDo() {
  return (
    <div className={styles.thingsToDo}>
      <h1 className={styles.title}>Things to Do</h1>
      <div className={styles.googleMapsButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          href="https://maps.app.goo.gl/7MeDNjXQKy9obQdj9"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<RoomIcon></RoomIcon>}
        >
          View List in Google Maps
        </Button>
      </div>
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
  return (
    <div>
      {PLACE_IDS.map((placeId) => (
        <ThingToDo placeId={placeId} key={placeId}></ThingToDo>
      ))}
    </div>
  );
});

const ThingToDo = ({ placeId }) => {
  const [place, setPlace] = useState();
  const attributionsRef = React.createRef();

  const getPlace = async () => {
    const placesService = new window.google.maps.places.PlacesService(
      attributionsRef.current
    );

    const fetchedPlace = await new Promise((resolve, reject) => {
      const fetchPlace = () => {
        placesService.getDetails({ placeId }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
          } else if (
            status ===
            window.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
          ) {
            setTimeout(() => fetchPlace(), 500);
          } else {
            reject(`Recieved PlaceServiceStatus: ${status}`);
          }
        });
      };
      fetchPlace();
    });
    setPlace(fetchedPlace);
  };

  useEffect(() => {
    getPlace();
  }, []);

  const isOpen = place && place.opening_hours && place.opening_hours.isOpen();

  return (
    <div>
      {place && (
        <MaterialCard className={styles.ttdCard}>
          <MaterialCardActionArea
            href={place.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className={styles.ttdCardContent}>
              {place.photos.length > 0 && (
                <div
                  className={styles.ttdImgContainer}
                  style={{
                    backgroundImage: `url(${place.photos[0].getUrl({
                      maxHeight: 400,
                    })})`,
                  }}
                ></div>
              )}
              <MaterialCardContent className={styles.ttdContent}>
                <Typography variant="h5">
                  {place.name}
                  <MaterialChip
                    size="small"
                    className={styles.ttdOpenChip}
                    color={isOpen ? "primary" : "default"}
                    label={isOpen ? "Open" : "Closed"}
                  />
                </Typography>
                <div className={styles.ttdCaptions}>
                  <Typography
                    variant="caption"
                    className={styles.ttdStarRating}
                  >
                    <StarIcon className={styles.ttdStarRatingIcon} />{" "}
                    {place.rating} ({place.user_ratings_total}){" "}
                    {place.price_level > 0 && (
                      <span>
                        &nbsp;&middot;&nbsp;
                        {[...new Array(place.price_level || 0).keys()].map(
                          () => "$"
                        )}
                      </span>
                    )}
                    {place.formatted_phone_number && (
                      <span>
                        &nbsp;&middot;&nbsp;{place.formatted_phone_number}
                      </span>
                    )}
                  </Typography>
                  {place.vicinity && (
                    <Typography variant="caption">
                      <a
                        href={place.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {place.vicinity}
                      </a>
                    </Typography>
                  )}
                </div>
                <div className={styles.ttdActions}>
                  <Button
                    className={styles.ttdActionButton}
                    variant="outlined"
                    color="primary"
                    href={place.website}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Website
                  </Button>
                  <Button
                    className={styles.ttdActionButton}
                    variant="outlined"
                    color="primary"
                    href={place.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Directions
                  </Button>
                  {place.international_phone_number && (
                    <Button
                      className={styles.ttdActionButton}
                      variant="outlined"
                      color="primary"
                      href={`tel:${place.international_phone_number.replaceAll(
                        " ",
                        ""
                      )}`}
                    >
                      Call
                    </Button>
                  )}
                  {window.navigator.canShare() && (
                    <Button
                      className={styles.ttdActionButton}
                      variant="outlined"
                      color="primary"
                      onClick={() => window.navigator.share({ url: place.url })}
                    >
                      Share
                    </Button>
                  )}
                </div>
              </MaterialCardContent>
            </div>
          </MaterialCardActionArea>
        </MaterialCard>
      )}
      <div ref={attributionsRef}></div>
    </div>
  );
};

export default ThingsToDo;
