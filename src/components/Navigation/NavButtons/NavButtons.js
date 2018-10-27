import React, { PropTypes, Fragment } from 'react';
import menuIcon, { ReactComponent as MenuBtn } from './menu.svg';
import searchIcon, { ReactComponent as SearchBtn } from './search.svg';
import styles from './NavButtons.module.scss';

const NavButtons = (props) => {
    return (
        <Fragment>
        	<MenuBtn className={styles.NavButtons} />
        	<SearchBtn className={styles.NavButtons} />
        </Fragment>
    );
};

NavButtons.displayName = 'NavButtons';

NavButtons.propTypes = {
    
};

export default NavButtons;
