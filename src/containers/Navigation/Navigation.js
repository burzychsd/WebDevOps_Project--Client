import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavButtons from '../../components/NavButtons';
import SearchBox from '../../components/SearchBox';
import SideBar from '../../components/SideBar';
import { logoutUser } from '../../actions/auth';
import { navigationActive } from '../../actions/navigation';
import styles from './Navigation.module.scss';

class Navigation extends Component {

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logoutUser(this.props.history)
	}

	render() {
		 return (
	        <header className="w-100 fixed">
	        	<nav className="w-100 h-100 flex justify-between items-center relative">
	        		<div className={!this.props.show ? 
	        			`${styles.OverlayBlock} w-100 h-100 absolute flex justify-center items-center` : 
	        			`${styles.OverlayBlock} ${styles.OverlayBlockActive} w-100 h-100 absolute flex justify-center items-center`
	        		}>
	        			<p className="ph2 tc b">The alarm has been triggered</p>
	        			<span className="b pointer" onClick={this.props.sound}>X</span>
	        		</div>
	        		<NavButtons open={this.props.navigationActive} />
	        		<SearchBox />
					<SideBar 
					logout={this.handleLogout} 
					status={this.props.nav.isOpen}
					username={this.props.user.username}
					avatar={this.props.user.avatar}
					clicked={this.props.navigationActive}
					size={this.props.browser.lessThan.medium} />
	        	</nav>
	        </header>
	    );
	}
};

const mapStateToProps = state => ({
	nav: state.nav,
	user: state.auth.user,
	browser: state.browser
});

Navigation.displayName = 'Navigation';

export default connect(mapStateToProps, { 
	logoutUser,
	navigationActive
})(withRouter(Navigation));