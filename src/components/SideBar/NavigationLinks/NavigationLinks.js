// DEPENDENCIES
import React from 'react';

// COMPONENTS
import NavigationLink from './NavigationLink';

// STYLES
import styles from './NavigationLinks.module.scss';

const NavigationLinks = (props) => {

	const { mobile, isOpen } = props;

    return (
        <ul className={styles.NavigationLinks}>
        	<NavigationLink isMobile={mobile} isClicked={isOpen} location="/dashboard" link="Dashboard" />
        	<NavigationLink isMobile={mobile} isClicked={isOpen} location="/dashboard/notes" link="Notes" />
			<NavigationLink isMobile={mobile} isClicked={isOpen} location="/dashboard/reminders" link="Reminders" />
			<NavigationLink isMobile={mobile} isClicked={isOpen} location="/dashboard/archive" link="Archive" />
			<NavigationLink isMobile={mobile} isClicked={isOpen} location="/dashboard/bin" link="Bin" />
        </ul>
    );
};

NavigationLinks.displayName = 'NavigationLinks';

export default NavigationLinks;
