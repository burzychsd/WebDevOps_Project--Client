// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './Avatar.module.scss';

const Avatar = (props) => {
    return (
        <div className={styles.Avatar}>
        	<img src={props.avatarPic} alt="avatar"/>
        </div>
    );
};

Avatar.displayName = 'Avatar';

export default Avatar;
