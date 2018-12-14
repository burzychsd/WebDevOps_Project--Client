// DEPENDENCIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { 
	logoutUser,
	navigationActive,
	renderNotes 
} from '../../actions';

// COMPONENTS
import { NavButtons, SearchBox, SideBar } from '../../components';

// STYLES
import styles from './Navigation.module.scss';

class Navigation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			search: ''
		}
	}

	handleChange = async (event) => {
		const { renderNotes } = this.props;
		const { search } = this.state;
		await this.setState({ [event.target.name]: event.target.value });
		renderNotes(search);
	}

	handleSubmitSearch = (event) => {
		event.preventDefault();
		const { location, history, renderNotes } = this.props;
		const { search } = this.state;
		const condition = location.pathname === '/dashboard/notes';

		if(!condition) {
			history.push('/dashboard/notes');
		}

		renderNotes(search);
	}

	handleLogout = (event) => {
		const { logoutUser, history } = this.props;
		event.preventDefault();
		logoutUser(history)
	}

	render() {

		const { show, sound, navigationActive, searchBox, nav, user, browser } = this.props;
		const { search } = this.state;
		 return (
	        <header className="w-100 fixed">
	        	<nav className="w-100 h-100 flex justify-between items-center relative">
	        		<div className={!show ? 
	        			`${styles.OverlayBlock} w-100 h-100 absolute flex justify-center items-center` : 
	        			`${styles.OverlayBlock} ${styles.OverlayBlockActive} w-100 h-100 absolute flex justify-center items-center`
	        		}>
	        			<p className="ph2 tc b">The alarm has been triggered</p>
	        			<span className="b pointer" onClick={sound}>X</span>
	        		</div>
	        		<NavButtons open={navigationActive} search={this.handleSubmitSearch} />
	        		<SearchBox 
	        		status={searchBox}  
	        		value={search} 
	        		change={this.handleChange} />
					<SideBar 
					logout={this.handleLogout} 
					status={nav.isOpen}
					username={user.username}
					avatar={user.avatar}
					clicked={navigationActive}
					size={browser.lessThan.medium} />
	        	</nav>
	        </header>
	    );
	}
};

const mapStateToProps = state => ({
	nav: state.nav,
	user: state.auth.user,
	browser: state.browser,
	searchBox: state.search.searchBox
});

Navigation.displayName = 'Navigation';

export default connect(mapStateToProps, { 
	logoutUser,
	navigationActive,
	renderNotes
})(withRouter(Navigation));