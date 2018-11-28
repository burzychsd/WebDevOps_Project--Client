import React, { Fragment } from 'react';
import { ReactComponent as ComfirmBtn } from '../PersonsInputs/acceptBtn.svg';
import styles from './Comfirmation.module.scss';

const Confirmation = (props) => {
    return (
        <div className="w-100 flex flex-column justify-between items-center pb4" style={{ height: 220 }}>
        	<h1 className="tc">Are You Sure?</h1>
        	<ComfirmBtn className={styles.ComfirmBtn} style={{ width: 40, height: 40 }} />
        </div>
    );
};

Confirmation.displayName = 'Confirmation';

export default Confirmation;
