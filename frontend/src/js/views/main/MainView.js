import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {Devices, Login, WaitOauth} from '../../components';
import axios from 'axios';
axios.defaults.withCredentials = true;

const padStyle = {
  marginTop: '30px'
};

class _MainView extends React.Component {
  render () {
    return (
      <div style={padStyle}>
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/oauth' component={WaitOauth} />
          <Route path='/devices' component={Devices} />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  appState: state.appState,
  view: state.views.main
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(_MainView);
