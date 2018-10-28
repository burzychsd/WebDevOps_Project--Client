import React from 'react';
import styles from './SubmitBtn.module.scss';

const SubmitBtn = (props) => {
    return (
        <button className={styles.SubmitBtn} type="submit">{props.button}</button>
    );
};

SubmitBtn.displayName = 'SubmitBtn';

export default SubmitBtn;
