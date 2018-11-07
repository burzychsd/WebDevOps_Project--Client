import React from 'react';
import NavigationLink from './NavigationLink';
import styles from './NavigationLinks.module.scss';

const NavigationLinks = (props) => {
    return (
        <ul className={styles.NavigationLinks}>
        	<NavigationLink location="/dashboard" link="Dashboard" />
        	<NavigationLink location="/dashboard/notes" link="Notes" />
			<NavigationLink location="/dashboard/reminders" link="Reminders" />
			<NavigationLink location="/dashboard/archive" link="Archive" />
			<NavigationLink location="/dashboard/bin" link="Bin" />
        </ul>
    );
};

NavigationLinks.displayName = 'NavigationLinks';

export default NavigationLinks;
