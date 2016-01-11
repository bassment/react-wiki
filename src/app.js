import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import App from './components/App.js';

const routes = (
  <Route path="/" component={App} />
);

ReactDOM.render(<Router
  children={routes}
  history={createHashHistory({ queryKey: false })}/>,
document.getElementById('app'));
