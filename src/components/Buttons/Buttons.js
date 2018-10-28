import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Buttons.module.scss';

const Buttons = (props) => {
    return (
        <div className={`${styles.ButtonsContainer} flex justify-around items-center mb3`}>
    		<Link to={props.link1} className={styles.LoginBtn}>{props.name1}</Link>
    		<p className="mh2">/</p>
    		<Link to={props.link2} className={styles.RegisterBtn}>{props.name2}</Link>
        </div>
    );
};

Buttons.displayName = 'Buttons';

export default Buttons;
