import React from 'react';
import { ReactComponent as ConfirmBtn } from '../PersonsInputs/acceptBtn.svg';
import styles from './Confirmation.module.scss';

const Confirmation = (props) => {
    return (
        <div className="w-100 flex flex-column justify-between items-center pb4" style={{ height: 220 }}>
        	<h1 className="tc">Are You Sure?</h1>
        	<ConfirmBtn className={styles.ConfirmBtn} style={{ width: 40, height: 40 }} onClick={props.click} />
        </div>
    );
};

Confirmation.displayName = 'Confirmation';

export default Confirmation;
