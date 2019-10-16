import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import HomeView from "./HomeView/HomeView";
import HotelsInfoView from "./HotelsInfoView/HotelsInfoView";
import PhotosView from "./PhotoView/PhotoView";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import { Router } from "@reach/router";
import { HashRouter, Route } from "react-router-dom";

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

// const Home = () => <HomeView />;
// const Photos = () => <PhotosView />;
// const HotelsInfo = () => <HotelsInfoView />;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter basename="/">
      <Route exact path="/" component={HomeView} />
      <Route path="/photos" component={PhotosView} />
      <Route path="/hotels" component={HotelsInfoView} />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();