// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import { StaggeredMotion, spring } from 'react-motion';

// STYLES
import styles from './NoteMoreMenu.module.scss';

class NoteMoreMenu extends Component {

	render() {

		const items = this.props.status === 'Notes' ? ['Update', 'Move to Archive', 'Move to Bin'] :
					  this.props.status === 'Archive' ? ['Back to Notes', 'Move to Bin'] : 
					  this.props.status === 'Reminders' ? ['Alarm Cancel'] : 
				      ['Back to Notes', 'Delete permanently'];

		return (
	        <div className={styles.NoteMoreMenu}>
	    		<ul>
	    			<StaggeredMotion 
	    			defaultStyles={[{o: this.props.show ? 0 : 1}, {o: this.props.show ? 0 : 1}, {o: this.props.show ? 0 : 1}]}
					styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
						return i === 0
						  ? {o: this.props.show ? spring(1) : spring(0)}
						  : {o: spring(prevInterpolatedStyles[i - 1].o)}
					})}>
	    				{interpolatingStyles =>
						    <Fragment>
						      {interpolatingStyles.map((style, i) =>
						        <button 
						        key={i} 
						        style={{ 
						        	opacity: `${this.props.show ? style.o :  0}`, 
						        	color: this.props.color }} 
						        onClick={this.props.clicked}
						        disabled={this.props.show ? false : true}>
						        {items[i]}</button>)
						      }
						    </Fragment>
						}
	    			</StaggeredMotion>
	    		</ul>
	        </div>
	    );
	}
};

NoteMoreMenu.displayName = 'NoteMoreMenu';

export default NoteMoreMenu;
