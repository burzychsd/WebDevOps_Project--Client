// DEPENDENCIES
import React from 'react';
import { NavLink } from 'react-router-dom';

// STYLES
import styles from './NavigationLink.module.scss';

const NavigationLink = (props) => {
    return (
		<NavLink to={props.location} 
		activeClassName={styles.active} 
		className={styles.NavigationLink}
		exact={true}
		onClick={props.isMobile ? props.isClicked : null}>{props.link}</NavLink>
    );
};

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;
