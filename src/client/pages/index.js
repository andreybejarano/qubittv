import 'babel-polyfill';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

const Pages = () => {
  return (
    <Switch>
      {
        routes.map((route, key) =>
          <Route key={key} {...route} />
        )
      }
    </Switch>
  );
};

export default Pages;
