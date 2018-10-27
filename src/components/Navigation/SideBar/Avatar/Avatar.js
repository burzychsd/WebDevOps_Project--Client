import React from 'react';
import profilePic from './profilePic.jpeg';
import styles from './Avatar.module.scss';

const Avatar = (props) => {
    return (
        <div className={styles.Avatar}>
        	<img src={profilePic} alt="avatar"/>
        </div>
    );
};

Avatar.displayName = 'Avatar';

export default Avatar;
