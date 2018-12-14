// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './Avatar.module.scss';

const Avatar = (props) => {

	const { avatarPic } = props;

    return (
        <div className={styles.Avatar}>
        	<img src={avatarPic} alt="avatar"/>
        </div>
    );
};

Avatar.displayName = 'Avatar';

export default Avatar;
