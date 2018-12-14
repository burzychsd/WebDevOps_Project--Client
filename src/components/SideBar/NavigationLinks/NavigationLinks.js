// DEPENDENCIES
import React from 'react';

// COMPONENTS
import NavigationLink from './NavigationLink';

// STYLES
import styles from './NavigationLinks.module.scss';

const NavigationLinks = (props) => {
    return (
        <ul className={styles.NavigationLinks}>
        	<NavigationLink isMobile={props.mobile} isClicked={props.isOpen} location="/dashboard" link="Dashboard" />
        	<NavigationLink isMobile={props.mobile} isClicked={props.isOpen} location="/dashboard/notes" link="Notes" />
			<NavigationLink isMobile={props.mobile} isClicked={props.isOpen} location="/dashboard/reminders" link="Reminders" />
			<NavigationLink isMobile={props.mobile} isClicked={props.isOpen} location="/dashboard/archive" link="Archive" />
			<NavigationLink isMobile={props.mobile} isClicked={props.isOpen} location="/dashboard/bin" link="Bin" />
        </ul>
    );
};

NavigationLinks.displayName = 'NavigationLinks';

export default NavigationLinks;
