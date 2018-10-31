import React, { Component, Fragment } from 'react';
import Navigation from '../Navigation';

class Dashboard extends Component {

    render() {
        return (
        	<Fragment>
	        	<Navigation />
	        	<main>
	        		<h1>Dashboard</h1>
	        	</main>
        	</Fragment>
        );
    }
}

export default Dashboard;
