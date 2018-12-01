import React from 'react';
import styles from './NoteDisplayTitle.module.scss';

const NoteDisplayTitle = (props) => {
    return (
        <h1 
        className={styles.NoteTitle} 
        style={{ color: props.color }}>{props.title}</h1>
    );
};

NoteDisplayTitle.displayName = 'NoteDisplayTitle';

export default NoteDisplayTitle;
