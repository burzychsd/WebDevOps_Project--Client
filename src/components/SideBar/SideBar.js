import React from 'react';
import Avatar from './Avatar';
import NavigationLinks from './NavigationLinks';
import LogoutBtn from './LogoutBtn';
import styles from './SideBar.module.scss';

const SideBar = (props) => {
    return (
        <div className={props.status ? 
            `${styles.SideBar} ${styles.SideBarActive} flex flex-column justify-center items-center fixed` : 
            `${styles.SideBar} flex flex-column justify-center items-center fixed`}>
        	<div className={`${styles.CloseBtnContainer} w-100 flex absolute`}>
        	</div>
        	<div className={`${styles.SideBarContainer} flex flex-column items-center`}>
				<Avatar avatarPic={props.avatar} />
				<p className={styles.userName}>{props.username}</p>
				<hr className="w-80" style={{ border: '0.5px solid #EBEBEB' }} />
				<NavigationLinks />
				<hr className="w-80 mt3" style={{ border: '0.5px solid #EBEBEB' }} />
				<LogoutBtn logoutClick={props.logout} />
        	</div>
        </div>
    );
};

SideBar.displayName = 'SideBar';

export default SideBar;
