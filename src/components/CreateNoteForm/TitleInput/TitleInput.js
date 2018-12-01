import React from 'react';
import styles from './TitleInput.module.scss';

const TitleInput = (props) => {
    return (
        <input className={styles.TitleInput} 
        style={{ 
        	height: 50, 
        	fontWeight: 700, 
        	padding: '0.5em', 
        	maxWidth: 'calc(400px + 1em)', 
        	border: !props.status ? '1px solid rgb(92,92,92)' : 'none',
        	borderRadius: props.status ? 25 : 0,
        	marginBottom: props.status ? 0 : '1em'
        }} 
        type="text" name="title" value={props.title} onChange={props.change} />
    );
};

TitleInput.displayName = 'TitleInput';

export default TitleInput;
