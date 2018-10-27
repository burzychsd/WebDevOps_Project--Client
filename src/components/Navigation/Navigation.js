import React, { PropTypes } from 'react';
import NavButtons from './NavButtons';
import './Navigation.module.scss';

const Navigation = (props) => {
    return (
        <header className="w-100 fixed">
        	<nav className="w-100 h-100 flex justify-between items-center">
        		<NavButtons />
        	</nav>
        </header>
    );
};

Navigation.displayName = 'Navigation';

Navigation.propTypes = {
   
};

export default Navigation;
