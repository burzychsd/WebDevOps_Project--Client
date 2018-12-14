// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './SearchBox.module.scss';

const SearchBox = (props) => {

	const { status, searchRef, value, change } = props;

    return (
        <input className={status ? `${styles.SearchBox} ${styles.SearchBoxActive}` : styles.SearchBox}
        ref={searchRef} 
        type="search" name="search" value={value} 
        results={5} placeholder="Search notes by title..." 
        onChange={change}/>
    );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
