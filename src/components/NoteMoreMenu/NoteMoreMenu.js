// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import shortid from 'shortid';

// STYLES
import styles from './NoteMoreMenu.module.scss';

class NoteMoreMenu extends Component {

	render() {

		const { status, show, color, clicked } = this.props;
		const items = status === 'Notes' ? ['Update', 'Move to Archive', 'Move to Bin'] :
					  status === 'Archive' ? ['Back to Notes', 'Move to Bin'] : 
					  status === 'Reminders' ? ['Alarm Cancel'] : 
				      ['Back to Notes', 'Delete permanently'];

		return (
	        <div className={styles.NoteMoreMenu}>
	    		<ul>
	    			<StaggeredMotion 
	    			defaultStyles={[{o: show ? 0 : 1}, {o: show ? 0 : 1}, {o: show ? 0 : 1}]}
					styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
						return i === 0
						  ? {o: show ? spring(1) : spring(0)}
						  : {o: spring(prevInterpolatedStyles[i - 1].o)}
					})}>
	    				{interpolatingStyles =>
						    <Fragment>
						      {interpolatingStyles.map((style, i) => {
						        return (<button 
						        key={shortid.generate()} 
						        style={{ 
						        	opacity: `${show ? style.o :  0}`, 
						        	color: color,
						        	display: `${show ? null : 'none'}` }} 
						        onClick={clicked}>
						        {items[i]}</button>
						        )})
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
