// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './FormTitle.module.scss';

const FormTitle = (props) => {

	const { title } = props;

    return (
        <h1 className={styles.FormTitle}>{title}</h1>
    );
};

FormTitle.displayName = 'FormTitle';

export default FormTitle;
