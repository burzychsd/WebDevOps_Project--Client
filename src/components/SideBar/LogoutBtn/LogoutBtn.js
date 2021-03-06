// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './LogoutBtn.module.scss';

const LogoutBtn = (props) => {

	const { logoutClick } = props;

    return (
    	<div className="w-80">
    		<button className={styles.LogoutBtn} onClick={logoutClick}>Logout</button>
    	</div>
    );
};

LogoutBtn.displayName = 'LogoutBtn';

export default LogoutBtn;
