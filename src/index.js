import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import HomeView from './HomeView/HomeView';
import HotelsInfoView from './HotelsInfoView/HotelsInfoView';
import VenueInfoView from './VenueInfoView/VenueInfoView';
import CovidInfoView from './CovidInfoView/CovidInfoView';
import MenuInfoView from './MenuInfoView/MenuInfoView';
import RegistryView from './RegistryView/RegistryView';
import PhotosView from './PhotoView/PhotoView';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {HashRouter as Router, Route} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7b241c',
    },
    secondary: {
      main: '#3d5369',
    },
  },
  typography: {
    fontFamily: ['Gabriela', 'serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="/">
      <Route exact path="/" component={HomeView} />
      <Route path="/covid" component={CovidInfoView} />
      <Route path="/venue" component={VenueInfoView} />
      <Route path="/photos" component={PhotosView} />
      <Route path="/hotels" component={HotelsInfoView} />
      <Route path="/menu" component={MenuInfoView} />
      <Route path="/registry" component={RegistryView} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
