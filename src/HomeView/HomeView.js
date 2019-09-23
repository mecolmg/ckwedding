import React from "react";
import styles from "./HomeView.module.scss";
import Footer from "Footer/Footer";
import Navigation from "Navigation/Navigation";
import RSVP from "RSVP/RSVP";
import Splash from "Splash/Splash";
import WeddingInfo from "WeddingInfo/WeddingInfo";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7b241c",
    },
    secondary: {
      main: "#3d5369",
    },
  },
  typography: {
    fontFamily: ["Gabriela", "serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

function HomeView() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.homeView}>
        <Navigation />
        <Splash />
        <WeddingInfo />
        <RSVP />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default HomeView;
