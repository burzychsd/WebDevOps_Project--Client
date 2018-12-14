// DEPENDENCIES
import React, { Fragment } from 'react';

// HELPERS
import FadeTransition from '../../helpers/FadeTransition';

// STYLES
import styles from './NoteContainer.module.scss';

const NoteContainer = (props) => {

	const { active, show, children, color } = props;
	
    return (
    	<Fragment>
    	{active ? 
	    	<FadeTransition showed={show} duration={200} style={{ background: '#EBEBEB' }}>
				<div className={styles.NoteContainer}>
					{children}
				</div> 
			</FadeTransition> : 
			<div className={`${styles.NoteContainer} pt3 pr3 pl3 pb1`} 
			style={{ 
				backgroundImage: `linear-gradient(to right bottom, ${color.join(',')})` }}>
				{children}
			</div>
		}
		</Fragment>
    );
};

NoteContainer.displayName = 'NoteContainer';

export default NoteContainer;
