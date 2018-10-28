import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Github } from './githubIcon.svg';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = (props) => {
    return (
        <div className="w-100 h-100 flex flex-column justify-center items-center" style={{ minHeight: 400 }}>
        	<div className={`${styles.LogoContainer} mb4`}>
				<Logo />
        	</div>
        	<div className={`${styles.ButtonsContainer} flex justify-around items-center mb3`}>
        		<Link to="/login" className={styles.LoginBtn}>Log in</Link>
        		<p className="mh2">/</p>
        		<Link to="/register" className={styles.RegisterBtn}>Register</Link>
        	</div>
        	<a href="https://github.com/burzychsd"><Github /></a>
        </div>
    );
};

Home.displayName = 'Home';

export default Home;
