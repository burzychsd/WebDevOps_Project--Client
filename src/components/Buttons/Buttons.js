// DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';

// STYLES
import styles from './Buttons.module.scss';

const Buttons = (props) => {

	const { link1, link2, name1, name2 } = props;

    return (
        <div className={`${styles.ButtonsContainer} flex justify-around items-center mb3`}>
    		<Link to={link1} className={styles.LoginBtn}>{name1}</Link>
    		<p className="mh2">/</p>
    		<Link to={link2} className={styles.RegisterBtn}>{name2}</Link>
        </div>
    );
};

Buttons.displayName = 'Buttons';

export default Buttons;
