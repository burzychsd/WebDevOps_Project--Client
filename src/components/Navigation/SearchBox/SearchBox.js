import React from 'react';
import styles from './SearchBox.module.scss';

const SearchBox = (props) => {
    return (
        <input className={styles.SearchBox} type="search" name="search" results={5} placeholder="Search notes by title..." />
    );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
