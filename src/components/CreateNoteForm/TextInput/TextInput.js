// DEPENDENCIES
import React from 'react';
import Textarea from 'react-textarea-autosize';

// STYLES
import styles from './TextInput.module.scss';

const TextInput = (props) => {

    const { status, text, change } = props;

    return (
        <Textarea className={styles.TextInput} 
            style={{ 
            	resize: 'none', 
            	minHeight: 50, 
            	padding: '0.5em', 
            	maxWidth: 'calc(400px + 1em)',
            	border: !status ? '1px solid rgb(92,92,92)' : 'none',
        		borderRadius: status ? 25 : 0,
        		marginBottom: status ? 0 : '1em' 
        	}} 
            name="text" value={text} onChange={change} />
    );
};

TextInput.displayName = 'TextInput';

export default TextInput;
