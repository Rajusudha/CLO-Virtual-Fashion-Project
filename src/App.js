import React from 'react';
import './App.css';
import FilterPanel from './features/FilterPanel';
import SearchBar from './features/SearchBar';
import ContentList from './features/ContentList';

const App = React.memo(function App() {
  return (
    <div className="App-container">
      <header className="App-header-sticky" style={{height:"100px", backgroundColor:"#000000"}}>
        <SearchBar />
        <FilterPanel />
        
      </header>
      <main style={{width:"100%", margin: "50px auto",  background: "#000000",marginTop:"6px"}}>
        {/* <div style={{marginTop: '100px', width:"100%"}}> */}
          <ContentList />
        {/* </div> */}
      </main>
    </div>
  );
});

export default App;
