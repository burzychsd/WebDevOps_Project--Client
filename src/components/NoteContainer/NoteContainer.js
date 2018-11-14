import React from 'react';
import styles from './NoteContainer.module.scss';
import FadeTransition from '../../helpers/FadeTransition';

const NoteContainer = (props) => {
    return (
    	<FadeTransition showed={props.show} duration={200}>
			<div className={styles.NoteContainer}>
				{props.children}
			</div> 
		</FadeTransition>
    );
};

NoteContainer.displayName = 'NoteContainer';

export default NoteContainer;
