import React, { Fragment } from 'react';
import { ReactComponent as MenuBtn } from './menu.svg';
import { ReactComponent as SearchBtn } from './search.svg';
import styles from './NavButtons.module.scss';

const NavButtons = (props) => {
    return (
        <Fragment>
        	<MenuBtn className={`${styles.NavButtons} ${styles.MenuBtn}`} onClick={props.open} />
        	<SearchBtn className={`${styles.NavButtons} ${styles.SearchBtn}`} />
        </Fragment>
    );
};

NavButtons.displayName = 'NavButtons';

export default NavButtons;
