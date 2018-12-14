// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './NoteDisplayTitle.module.scss';

const NoteDisplayTitle = (props) => {

	const { color, title } = props;

    return (
        <h1 
        className={styles.NoteTitle} 
        style={{ color }}>{title}</h1>
    );
};

NoteDisplayTitle.displayName = 'NoteDisplayTitle';

export default NoteDisplayTitle;
