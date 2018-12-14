// DEPENDENCIES
import React, { Fragment } from 'react';

// COMPONENTS
import { ReactComponent as MenuBtn } from './menu.svg';
import { ReactComponent as SearchBtn } from './search.svg';

// STYLES
import styles from './NavButtons.module.scss';

const NavButtons = (props) => {
	
    return (
        <Fragment>
        	<div className={`${styles.MenuBtnContainer} h-100 flex items-center pointer`} onClick={props.open}>
        		<MenuBtn className={`${styles.NavButtons} ${styles.MenuBtn}`} />
        	</div>
        	<SearchBtn className={`${styles.NavButtons} ${styles.SearchBtn}`} onClick={props.search} />
        </Fragment>
    );
};

NavButtons.displayName = 'NavButtons';

export default NavButtons;
