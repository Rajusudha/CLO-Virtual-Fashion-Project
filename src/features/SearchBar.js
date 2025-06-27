import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from './searchSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchTerm(''));
  };git

  return (
    <div className={styles.searchBarContainer} style={{position:'relative',marginTop:"20px"}}>
      <input
        type="text"
        placeholder="Find the items you're looking for"
        value={searchTerm}
        onChange={handleChange}
        className={styles.input}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="4" x2="12" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="4" x2="4" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {!searchTerm && (
        <svg className={styles.searchIconRight} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

export default SearchBar; 