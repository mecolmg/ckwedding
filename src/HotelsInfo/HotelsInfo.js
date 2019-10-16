import React, { useState } from "react";
import ComfortSuitesLogo from "./images/ComfortSuitesLogo.png";
import MarriottLogo from "./images/MarriottLogo.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styles from "./HotelsInfo.module.scss";
import { useTheme } from "@material-ui/core/styles";

export function Splash() {
  return <div className={styles.splash}></div>;
}

export function HotelsInfo(props) {
  const [marriottDialogOpen, setMarriottDialogOpen] = useState(false);
  const [comfortSuitesDialogOpen, setComfortSuitesDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const classNames =
    styles.hotelsInfo + (props.className ? ` ${props.className}` : "");
  return (
    <div className={classNames}>
      <h1 className={styles.title}>Hotels Info</h1>
      <div className={styles.hotelsContainer}>
        <Hotel
          name="Comfort Suites"
          address={"20065 Lakeview Center Plaza\nAshburn, Virginia 20147"}
          link="https://www.marriott.com/events/start.mi?id=1570632297188&key=GRP"
          mapsLink="https://goo.gl/maps/YWEChCQBNbNHP1GQ7"
          logo={ComfortSuitesLogo}
          viewMoreAction={() => setComfortSuitesDialogOpen(true)}
        />
        <Hotel
          name="Marriott - SpringHill Suites"
          address={"80 Prosperity Ave\nLeesburg, VA, 20175"}
          link="https://www.choicehotels.com/reservations/groups/IA67G8"
          mapsLink="https://goo.gl/maps/KKAgCeakvqvwo8Uf8"
          logo={MarriottLogo}
          viewMoreAction={() => setMarriottDialogOpen(true)}
        />
      </div>
      <Dialog
        open={comfortSuitesDialogOpen}
        maxWidth="md"
        fullScreen={fullScreen}
      >
        <DialogTitle>Comfort Suites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Room Options</h2>
            <p>
              <b>King Studio Suites</b> - One king bed and a pull out sleeper
              sofa, mini refrigerator, microwave, and coffee maker.
              <br />
              Arrival on September 25th, 2020 and departure on September 27th,
              2020
              <br />
              $135 per night plus tax
            </p>
            <p>
              <b>Queen Studio Suites</b> - Two queen beds and a pull out sleeper
              sofa, mini refrigerator, microwave and coffee maker.
              <br />
              Arrival on September 25th, 2020 and departure on September 27th,
              2020
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
              <b>Rental Cars</b> - If you'd prefer a little more freedom, you
              can rent a car from Enterprise Rental Car in Leeseburg for a
              discounted rate. The rate code is <b>L16V68G / COM</b>. Call
              703-777-5800 to book.
            </p>
            <h2>How to Book</h2>
            <p>
              To book your room, you can call the hotel directly at 703-669-1650
              and ask for the Salvatore Wedding room block. You can also{" "}
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
      <Dialog open={marriottDialogOpen} maxWidth="md" fullScreen={fullScreen}>
        <DialogTitle>Marriott - SpringHill Suites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Room Options</h2>
            <p>
              <b>King Suite</b> - One king bed and a trundle bed, mini
              refrigerator, microwave, and coffee maker.
              <br />
              Starts on September 24th, 2020 and ends on September 28th, 2020
              <br />
              $129 per night plus tax
            </p>
            <p>
              <b>Queen Suite</b> - Two queen beds and a trundle bed, mini
              refrigerator, microwave, and coffee maker.
              <br />
              Starts on September 24th, 2020 and ends on September 28th, 2020
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
              The last day to book is August 28th, 2020. To book your room, you
              can call the hotel directly at 703-723-9300 and ask for the
              Salvatore-Gallagher Wedding room block. You can also{" "}
              <a href="https://www.marriott.com/events/start.mi?id=1570632297188&key=GRP">
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

function Hotel(props) {
  return (
    <div className={styles.hotel}>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img
          src={props.logo}
          alt={`${props.name} Logo`}
          className={styles.hotelImage}
        />
      </a>
      <p>{props.name}</p>
      <a href={props.mapsLink} target="_blank" rel="noopener noreferrer">
        <div>
          {props.address.split("\n").map(x => (
            <div>{x}</div>
          ))}
        </div>
      </a>
      <div className={styles.hotelButtons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.viewMoreAction()}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default HotelsInfo;