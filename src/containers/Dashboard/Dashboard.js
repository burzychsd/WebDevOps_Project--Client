import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Navigation from '../Navigation';
import styles from './Dashboard.module.scss';

class Dashboard extends Component {

    render() {
        return (
        	<Fragment>
	        	<Navigation />
	        	<main className={this.props.nav.isOpen ? 
                `${styles.Dashboard} ${styles.navActive} flex justify-center items-center` : 
                `${styles.Dashboard} flex justify-center items-center`}>
	        		<h1>Dashboard</h1>
	        	</main>
        	</Fragment>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps, null)(Dashboard);
