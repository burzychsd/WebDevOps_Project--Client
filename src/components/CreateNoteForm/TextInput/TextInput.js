import React from 'react';
import Textarea from 'react-textarea-autosize';
import styles from './TextInput.module.scss';

const TextInput = (props) => {
    return (
        <Textarea className={styles.TextInput} 
            style={{ 
            	resize: 'none', 
            	minHeight: 50, 
            	padding: '0.5em', 
            	maxWidth: 'calc(400px + 1em)',
            	border: !props.status ? '1px solid rgb(92,92,92)' : 'none',
        		borderRadius: props.status ? 25 : 0,
        		marginBottom: props.status ? 0 : '1em' 
        	}} 
            name="text" value={props.text} onChange={props.change} />
    );
};

TextInput.displayName = 'TextInput';

export default TextInput;
