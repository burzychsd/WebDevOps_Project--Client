import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    return (
        <input
        type={props.inputType}
        placeholder={props.inputText}
        className={styles.Input}
        name={props.inputName}
        onChange={props.change}
        value={props.inputValue}
        />
    );
};

Input.displayName = 'Input';

export default Input;
