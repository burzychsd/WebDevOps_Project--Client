import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

// import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<Router>
	      	<Fragment>
	      		<Route exact path="/" component={Home} />
	      		<Route exact path="/register" component={Register} />
	            <Route exact path="/login" component={Login} />
	        </Fragment>
      	</Router>
      </Provider>
    );
  }
}

export default App;
