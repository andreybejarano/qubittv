import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/Main.css';

import Pages from './pages';

const app = document.getElementById('app');
ReactDOM.hydrate(
  <BrowserRouter>
    <Pages />
  </BrowserRouter>,
  app
);
