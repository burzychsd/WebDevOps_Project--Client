// DEPENDENCIES
import React, { Component } from 'react';

// STYLES
import styles from './NoteDisplayListItem.module.scss';

class NoteDisplayListItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
	}

	handleChecked = () => {
		this.setState((state) => { return { checked: !state.checked } });
	}

	render() {
		return (
	        <li className={this.state.checked ? `${styles.Item} w-100 mv2 strike` : 
	        `${styles.Item} w-100 mv2`} 
	        style={{ color: `${this.props.color}` }}
	        onClick={this.handleChecked}>{this.props.item}</li>
	    );
	}
};

NoteDisplayListItem.displayName = 'NoteDisplayListItem';

export default NoteDisplayListItem;
