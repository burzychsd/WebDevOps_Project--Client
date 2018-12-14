// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './Form.module.scss';

const Form = (props) => {
    return (
        <div className={`${styles.FormContainer} flex flex-column justify-center align-center`}>
        	{props.children}
        </div>
    );
};

Form.displayName = 'Form';

export default Form;
