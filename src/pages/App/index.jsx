import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFound, Cart } from '../index';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          {
            // Define all your routes here
          }
          <Route exact path="/" component={Home} />
          <Route exact path="/Cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
