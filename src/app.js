import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './components/App';
import Page from './components/Page';

const routes = (
  <Route path="/" component={App}>
    <Route path="/page/:id" component={Page} />
  </Route>
);

ReactDOM.render(<Router
  children={routes}
  history={createBrowserHistory({ queryKey: false })}/>,
document.getElementById('app'));
