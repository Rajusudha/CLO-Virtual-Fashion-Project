import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from './searchSlice';
import styles from './SearchBar.module.css';

// Helper to get unique suggestions
function getSuggestions(items, searchTerm) {
  if (!searchTerm) return [];
  const term = searchTerm.toLowerCase();
  const suggestions = new Set();
  items.forEach(item => {
    if (item.title && item.title.toLowerCase().includes(term)) {
      suggestions.add(item.title);
    }
    if (item.userName && item.userName.toLowerCase().includes(term)) {
      suggestions.add(item.userName);
    }
  });
  return Array.from(suggestions).slice(0, 6);
}

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);
  const items = useSelector((state) => state.content.items);
  const filters = useSelector((state) => state.filters);
  // Filtering logic (copied from ContentList)
  const activePricing = [];
  if (filters.paid) activePricing.push('Paid');
  if (filters.free) activePricing.push('Free');
  if (filters.viewOnly) activePricing.push('View Only');
  const filteredItems = items.filter(item => {
    if (activePricing.length > 0 && !activePricing.includes(item.pricingOption)) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const inTitle = item.title && item.title.toLowerCase().includes(term);
      const inUser = item.userName && item.userName.toLowerCase().includes(term);
      if (!inTitle && !inUser) return false;
    }
    return true;
  });
  const showKeywordSearch = searchTerm && searchTerm.trim().length > 0;

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchTerm(''));
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch(setSearchTerm(suggestion));
  };

  return (
    <div className={styles.searchBarContainer} style={{position:'relative'}}>
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