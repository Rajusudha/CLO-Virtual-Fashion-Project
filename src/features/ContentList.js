import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, incrementPage } from './contentSlice';
import styles from './ContentList.module.css';

const getFilteredItems = (items, filters, searchTerm) => {
  // Get active pricing options
  const activePricing = [];
  if (filters.paid) activePricing.push('Paid');
  if (filters.free) activePricing.push('Free');
  if (filters.viewOnly) activePricing.push('View Only');

  return items.filter(item => {
    // If pricing filters are active, item must match one
    if (activePricing.length > 0 && !activePricing.includes(item.pricingOption)) {
      return false;
    }
    // If search term is present, item must match title or userName
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const inTitle = item.title && item.title.toLowerCase().includes(term);
      const inUser = item.userName && item.userName.toLowerCase().includes(term);
      if (!inTitle && !inUser) return false;
    }
    return true;
  });
};

const Skeleton = () => (
  <div style={{ background: '#eee', height: 200, borderRadius: 8, margin: 8 }} />
);

const ContentList = () => {
  const dispatch = useDispatch();
  const { items, loading, hasMore, page } = useSelector((state) => state.content);
  const filters = useSelector((state) => state.filters);
  const searchTerm = useSelector((state) => state.search.term);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPage());
          dispatch(fetchContent());
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  const filteredItems = getFilteredItems(items, filters, searchTerm);

  return (
    <div className={styles.contentGrid} >
      {filteredItems.map((item, idx) => {
        const key = `${item.id}-${idx}`;
        if (filteredItems.length === idx + 1) {
          return (
            <div ref={lastItemRef} key={key} className={styles.card}>
              <img src={item.imageUrl} alt={item.title} className={styles.cardImage} />
              <div className={styles.cardInfoBottom}>
                <div className={styles.cardInfoLeftBottom}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardCreator}>{item.userName}</p>
                </div>
                <div className={styles.cardRightBottom}>
                  <span>{item.pricingOption === 'Paid' && item.price ? `$${item.price}` : item.pricingOption === 'Free' ? 'Free' : item.pricingOption === 'View Only' ? 'View Only' : ''}</span>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div key={key} className={styles.card} >
            <img src={item.imageUrl} alt={item.title} className={styles.cardImage} />
            <div className={styles.cardInfoBottom}>
              <div className={styles.cardInfoLeftBottom}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCreator}>{item.userName}</p>
              </div>
              <div className={styles.cardRightBottom}>
                <span>{item.pricingOption === 'Paid' && item.price ? `$${item.price}` : item.pricingOption === 'Free' ? 'Free' : item.pricingOption === 'View Only' ? 'View Only' : ''}</span>
              </div>
            </div>
          </div>
        );
      })}
      {loading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
    </div>
  );
};

export default ContentList; 