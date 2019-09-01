import React from 'react';
import ReactDOM from 'react-dom';
import HomeView from './HomeView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
