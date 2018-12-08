import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import PrivateRoute from '../helpers/PrivateRoute';
import { Provider } from 'react-redux';
import store from '../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/auth';
import { alarmTimer } from '../actions/alarmTimer';

import Home from '../components/Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from '../components/NotFound';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}  

class App extends Component {

  componentDidMount() {
    this.interval = setInterval(() => store.dispatch(alarmTimer()), 2500);
    store.subscribe(() => {
      const state = store.getState();
      const notes = state.renderNotes.notes;
      const timer = state.timer.alarmTimer;
      notes.forEach(note => {
        if(note.alarm && timer !== '') {
          const condition = moment(timer).isSame(
            moment(note.alarm).toISOString().split('').splice(0, 16).join(''), 'minute');
          if(condition) {
            const sound = document.getElementById('alarm-sound');
            sound.play();
          }
        }
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Provider store={store}>
      	<Router>
	      	<Switch>
	      		<Route exact path="/" component={Home} />
	      		<Route exact path="/register" component={Register} />
	          <Route exact path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
	        </Switch>
      	</Router>
      </Provider>
    );
  }
}

export default App;
