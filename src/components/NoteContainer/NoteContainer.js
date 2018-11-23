import React, { Fragment } from 'react';
import styles from './NoteContainer.module.scss';
import FadeTransition from '../../helpers/FadeTransition';

const NoteContainer = (props) => {
    return (
    	<Fragment>
    	{props.active ? 
    	<FadeTransition showed={props.show} duration={200}>
			<div className={styles.NoteContainer}>
				{props.children}
			</div> 
		</FadeTransition> : 
		<div className={`${styles.NoteContainer} pa3`}>
			{props.children}
		</div>
		}
		</Fragment>
    );
};

NoteContainer.displayName = 'NoteContainer';

export default NoteContainer;
