import React from 'react';
import styles from './FormTitle.module.scss';

const FormTitle = (props) => {
    return (
        <h1 className={styles.FormTitle}>{props.title}</h1>
    );
};

FormTitle.displayName = 'FormTitle';

export default FormTitle;
