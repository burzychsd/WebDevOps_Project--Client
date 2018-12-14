// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './NoteDisplayText.module.scss';

const NoteDisplayText = (props) => {

	const { color, text } = props;

    return (
        <p style={{ color }} className={styles.NoteText}>{text}</p>

    );
};

NoteDisplayText.displayName = 'NoteDisplayText';

export default NoteDisplayText;
