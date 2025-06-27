import React from 'react';
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

  const handleChange = (key) => (e) => {
    dispatch(setFilter({ filter: key, value: e.target.checked }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const checkedCount = FILTERS.filter(({ key }) => filters[key]).length;

  return (
    <>
      <div style={{ color: '#629980', margin: '0 0 8px 40px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
        {checkedCount > 0 ? `${checkedCount} ` : ''}Contents Filter
      </div>
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
    </>
  );
};

export default FilterPanel; 