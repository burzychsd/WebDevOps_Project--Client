// DEPENDENCIES
import React from 'react';

// STYLES
import styles from './SearchBox.module.scss';

const SearchBox = (props) => {
    return (
        <input className={props.status ? `${styles.SearchBox} ${styles.SearchBoxActive}` : styles.SearchBox}
        ref={props.searchRef} 
        type="search" name="search" value={props.value} 
        results={5} placeholder="Search notes by title..." 
        onChange={props.change}/>
    );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
