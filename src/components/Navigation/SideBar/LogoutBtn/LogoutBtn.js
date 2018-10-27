import React from 'react';
import styles from './LogoutBtn.module.scss';

const LogoutBtn = () => {
    return (
    	<div className="w-80">
    		<button className={styles.LogoutBtn}>Logout</button>
    	</div>
    );
};

LogoutBtn.displayName = 'LogoutBtn';

export default LogoutBtn;
