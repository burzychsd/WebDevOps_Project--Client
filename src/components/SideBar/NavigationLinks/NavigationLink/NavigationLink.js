// DEPENDENCIES
import React from 'react';
import { NavLink } from 'react-router-dom';

// STYLES
import styles from './NavigationLink.module.scss';

const NavigationLink = (props) => {

	const { location, isMobile, isClicked, link } = props;

    return (
		<NavLink to={location} 
		activeClassName={styles.active} 
		className={styles.NavigationLink}
		exact={true}
		onClick={isMobile ? isClicked : null}>{link}</NavLink>
    );
};

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;
