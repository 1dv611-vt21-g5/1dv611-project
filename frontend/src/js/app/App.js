import React from 'react';
import {Provider} from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../img/logo.png';

import store from '../state/store';
import MainView from '../views/main/MainView';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Yggio service demo</h1>
      </header>
  <CookiesProvider>
      <MainView />
  </CookiesProvider>
    </div>
  </Provider>
);

export default App;
