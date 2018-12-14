// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './SubmitBtn.module.scss';

const SubmitBtn = (props) => {
    return (
        <button className={styles.SubmitBtn} type="submit">{props.button}</button>
    );
};

SubmitBtn.displayName = 'SubmitBtn';

export default SubmitBtn;
