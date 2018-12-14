// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './NoteDisplayText.module.scss';

const NoteDisplayText = (props) => {
    return (
        <p style={{ color: props.color }} className={styles.NoteText}>{props.text}</p>

    );
};

NoteDisplayText.displayName = 'NoteDisplayText';

export default NoteDisplayText;
