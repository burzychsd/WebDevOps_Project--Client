import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavButtons from '../../components/NavButtons';
import SearchBox from '../../components/SearchBox';
import SideBar from '../../components/SideBar';
import { logoutUser } from '../../actions/auth';
import { navigationActive } from '../../actions/navigation';
import { alarmStatus } from '../../actions/alarmTimer';
import { updateNote, removeNote } from '../../actions/updateNotes';
import { renderNotes } from '../../actions/renderNotes';
import styles from './Navigation.module.scss';

const sound = document.getElementById('alarm-sound');

class Navigation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logoutUser(this.props.history)
	}

	handleSound = () => {
		const promise = new Promise((resolve) => {
			const { notes, alarmTimer, alarmStatus } = this.props;
			const notesWithAlarms = notes.filter(note => note.alarm);
			const currentNote = notesWithAlarms.filter(note => 
				moment(alarmTimer, "YYYY-MM-DDTHH:mm")
				.isSame(moment(note.alarm, "YYYY-MM-DDTHH:mm"), 'minute')
			)[0]
			alarmStatus();
			resolve(currentNote._id);
		});

		this.setState({ show: false });
		promise.then((res) => {
			const { updateNote, renderNotes, removeNote } = this.props;
			const obj = {
				alarm: ''
			}
			updateNote(res, obj, 'reminders');
			removeNote(res, 'reminders');
			setTimeout(() => renderNotes(), 400);
		});
	}

	handlePlay = () => {
		this.setState({ show: true });
	}

	componentDidMount() {
		sound.addEventListener('play', this.handlePlay);
	}

	componentWillUnmount() {
		sound.removeEventListener('play', this.handlePlay);
	}

	render() {
		 return (
	        <header className="w-100 fixed">
	        	<nav className="w-100 h-100 flex justify-between items-center relative">
	        		<div className={!this.state.show ? 
	        			`${styles.OverlayBlock} w-100 h-100 absolute flex justify-center items-center` : 
	        			`${styles.OverlayBlock} ${styles.OverlayBlockActive} w-100 h-100 absolute flex justify-center items-center`
	        		}>
	        			<p className="ph2 tc b">The alarm has been triggered</p>
	        			<span className="b pointer" onClick={this.handleSound}>X</span>
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
	browser: state.browser,
	alarmTimer: state.timer.alarmTimer,
	notes: state.renderNotes.notes
});

Navigation.displayName = 'Navigation';

export default connect(mapStateToProps, { 
	logoutUser, 
	navigationActive,
	alarmStatus,
	updateNote,
	removeNote,
	renderNotes
})(withRouter(Navigation));