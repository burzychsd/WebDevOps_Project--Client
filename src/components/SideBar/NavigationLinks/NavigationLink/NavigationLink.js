import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationLink.module.scss';

const NavigationLink = (props) => {
    return (
		<NavLink to={props.location} 
		activeClassName={styles.active} 
		className={styles.NavigationLink}>{props.link}</NavLink>
    );
};

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;
