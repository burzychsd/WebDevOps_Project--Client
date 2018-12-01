import React, { Fragment } from 'react';
import styles from './NoteContainer.module.scss';
import FadeTransition from '../../helpers/FadeTransition';

const NoteContainer = (props) => {
	
    return (
    	<Fragment>
    	{props.active ? 
	    	<FadeTransition showed={props.show} duration={200} style={{ background: '#EBEBEB' }}>
				<div className={styles.NoteContainer}>
					{props.children}
				</div> 
			</FadeTransition> : 
			<div className={`${styles.NoteContainer} pt3 pr3 pl3 pb1`} 
			style={{ 
				backgroundImage: `linear-gradient(to right bottom, ${props.color.join(',')})` }}>
				{props.children}
			</div>
		}
		</Fragment>
    );
};

NoteContainer.displayName = 'NoteContainer';

export default NoteContainer;
