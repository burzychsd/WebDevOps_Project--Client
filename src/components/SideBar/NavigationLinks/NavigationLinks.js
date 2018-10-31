import React from 'react';
import NavigationLink from './NavigationLink';
import styles from './NavigationLinks.module.scss';

const NavigationLinks = (props) => {
    return (
        <ul className={styles.NavigationLinks}>
        	<NavigationLink link="Notes" />
			<NavigationLink link="Reminders" />
			<NavigationLink link="Archive" />
			<NavigationLink link="Bin" />
        </ul>
    );
};

NavigationLinks.displayName = 'NavigationLinks';

export default NavigationLinks;
