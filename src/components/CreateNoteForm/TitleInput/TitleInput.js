// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './TitleInput.module.scss';

const TitleInput = (props) => {

    const { status, title, change } = props;

    return (
        <input className={styles.TitleInput} 
        style={{ 
        	height: 50, 
        	fontWeight: 700, 
        	padding: '0.5em', 
        	maxWidth: 'calc(400px + 1em)', 
        	border: !status ? '1px solid rgb(92,92,92)' : 'none',
        	borderRadius: status ? 25 : 0,
        	marginBottom: status ? 0 : '1em'
        }} 
        type="text" name="title" value={title} onChange={change} />
    );
};

TitleInput.displayName = 'TitleInput';

export default TitleInput;
