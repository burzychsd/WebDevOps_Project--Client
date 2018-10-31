import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavButtons from '../../components/NavButtons';
import SearchBox from '../../components/SearchBox';
import SideBar from '../../components/SideBar';
import { logoutUser } from '../../actions/auth';
import './Navigation.module.scss';

class Navigation extends Component {

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logoutUser(this.props.history)
	}

	render() {
		 return (
	        <header className="w-100 fixed">
	        	<nav className="w-100 h-100 flex justify-between items-center relative">
	        		<NavButtons />
	        		<SearchBox />
					<SideBar logout={this.handleLogout}/>
	        	</nav>
	        </header>
	    );
	}
};

Navigation.displayName = 'Navigation';

export default connect(null, { logoutUser })(withRouter(Navigation));