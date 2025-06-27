import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from './filtersSlice';
import styles from './FilterPanel.module.css';

const FILTERS = [
  { label: 'Paid', key: 'paid' },
  { label: 'Free', key: 'free' },
  { label: 'View Only', key: 'viewOnly' },
];

const FilterPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect mobile screen
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches;

  const handleChange = (key) => (e) => {
    dispatch(setFilter({ filter: key, value: e.target.checked }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const checkedCount = FILTERS.filter(({ key }) => filters[key]).length;

  // Mobile drawer toggle
  const handleToggle = () => setMobileOpen((open) => !open);

  return (
    <>
      <div style={{ color: '#629980', margin: isMobile ? '0 0 8px 12px' : '0 0 8px 40px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6,marginBottom:"7px" }}>
       Contents Filter
      </div>
      {isMobile ? (
        <div>
          <button
            onClick={handleToggle}
            style={{
              background: '#23232b',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '10px 18px',
              fontSize: 15,
              cursor: 'pointer',
              width: '90%',
              margin: '0 auto 10px auto',
              display: 'block',
              boxShadow: '0 2px 8px rgba(60,60,60,0.08)'
            }}
          >
            {mobileOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          {mobileOpen && (
            <div className={styles.filterPanelContainer} style={{flexDirection:'column', alignItems:'stretch', maxHeight:'60vh', overflowY:'auto', marginBottom:12}}>
              <span style={{ color: '#5C5C63', fontWeight: 600, marginRight: 12, fontSize: '14px' }}>Pricing Option</span>
              {FILTERS.map(({ label, key }) => (
                <label key={key} className={styles.checkboxLabel} style={{padding:'8px 0'}}>
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={handleChange(key)}
                    className={styles.checkboxInput}
                  />
                  {label}
                </label>
              ))}
              <div className={styles.spacer} />
              <button onClick={handleReset} className={styles.resetButton} style={{width:'100%'}}>Reset</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.filterPanelContainer}>
          <span style={{ color: '#5C5C63', fontWeight: 600, marginRight: 12, fontSize: '14px' }}>Pricing Option</span>
          {FILTERS.map(({ label, key }) => (
            <label key={key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={handleChange(key)}
                className={styles.checkboxInput}
              />
              {label}
            </label>
          ))}
          <div className={styles.spacer} />
          <button onClick={handleReset} className={styles.resetButton}>Reset</button>
        </div>
      )}
    </>
  );
};

export default FilterPanel; 