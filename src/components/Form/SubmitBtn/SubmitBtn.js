// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './SubmitBtn.module.scss';

const SubmitBtn = (props) => {

	const { button } = props;

    return (
        <button className={styles.SubmitBtn} type="submit">{button}</button>
    );
};

SubmitBtn.displayName = 'SubmitBtn';

export default SubmitBtn;
