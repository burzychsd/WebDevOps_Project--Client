// DEPENDENCIES
import React from 'react';

// COMPONENTS
import { ReactComponent as Logo } from './logo.svg';
import Buttons from '../Buttons';
import { ReactComponent as Github } from './githubIcon.svg';

// STYLES
import styles from './Home.module.scss';

const Home = (props) => {
    return (
        <div className="w-100 flex flex-column justify-center items-center" style={{ minHeight: 400, height: '100vh' }}>
        	<div className={`${styles.LogoContainer} mb4`}>
				<Logo />
        	</div>
        	<Buttons link1="/login" name1="Log in" link2="/register" name2="Register" />
        	<a target="_blank" rel="noopener noreferrer" href="https://github.com/burzychsd"><Github /></a>
        </div>
    );
};

Home.displayName = 'Home';

export default Home;
