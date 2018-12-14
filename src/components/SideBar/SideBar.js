// DEPENDENCIES
import React from 'react';

// COMPONENTS
import Avatar from './Avatar';
import NavigationLinks from './NavigationLinks';
import LogoutBtn from './LogoutBtn';

// STYLES
import styles from './SideBar.module.scss';

const SideBar = (props) => {

    const { status, avatar, username, clicked, logout, size } = props;

    return (
        <div className={status ? 
            `${styles.SideBar} ${styles.SideBarActive} flex flex-column justify-center items-center fixed` : 
            `${styles.SideBar} flex flex-column justify-center items-center fixed`}>
        	<div className={`${styles.CloseBtnContainer} w-100 flex absolute`}>
        	</div>
        	<div className={`${styles.SideBarContainer} flex flex-column items-center`}>
				<Avatar avatarPic={avatar} />
				<p className={styles.userName}>{username}</p>
				<hr className="w-80" style={{ border: '0.5px solid #EBEBEB' }} />
				<NavigationLinks isOpen={clicked} mobile={size} />
				<hr className="w-80 mt3" style={{ border: '0.5px solid #EBEBEB' }} />
				<LogoutBtn logoutClick={logout} />
        	</div>
        </div>
    );
};

SideBar.displayName = 'SideBar';

export default SideBar;
