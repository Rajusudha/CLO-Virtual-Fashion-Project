import React from 'react';
import './App.css';
import FilterPanel from './features/FilterPanel';
import SearchBar from './features/SearchBar';
import ContentList from './features/ContentList';

const App = React.memo(function App() {
  return (
    <div className="App-container">
      <header className="App-header-sticky">
        <SearchBar />
        <FilterPanel />
      </header>
      <main>
        <ContentList />
      </main>
    </div>
  );
});

export default App;
