import React from 'react';
import styles from './FormBody.module.scss';

const FormBody = (props) => {
    return (
       <form className={`${styles.FormBody} flex flex-column justify-between items-center`} onSubmit={props.submit}>
			{props.children}
       </form> 
    );
};

FormBody.displayName = 'FormBody';

export default FormBody;
