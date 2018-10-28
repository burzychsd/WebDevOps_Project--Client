import React from 'react';
import NavButtons from './NavButtons';
import SearchBox from './SearchBox';
import SideBar from './SideBar';
import './Navigation.module.scss';

const Navigation = (props) => {
    return (
        <header className="w-100 fixed">
        	<nav className="w-100 h-100 flex justify-between items-center relative">
        		<NavButtons />
        		<SearchBox />
				<SideBar />
        	</nav>
        </header>
    );
};

Navigation.displayName = 'Navigation';

export default Navigation;