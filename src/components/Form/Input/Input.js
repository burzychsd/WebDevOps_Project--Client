// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './Input.module.scss';

const Input = (props) => {

    const { inputType, inputText, inputName, change, inputValue } = props;

    return (
        <input
        type={inputType}
        placeholder={inputText}
        className={styles.Input}
        name={inputName}
        onChange={change}
        value={inputValue}
        />
    );
};

Input.displayName = 'Input';

export default Input;
