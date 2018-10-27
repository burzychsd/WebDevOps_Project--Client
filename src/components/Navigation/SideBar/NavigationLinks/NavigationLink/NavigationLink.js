import React from 'react';
import styles from './NavigationLink.module.scss';

const NavigationLink = (props) => {
    return (
		<li className={styles.NavigationLink}><a href="#">{props.link}</a></li>
    );
};

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;
