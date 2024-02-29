import React from 'react';
import './App.css';
import ArtGenerator from './components/ArtGenerator'; // Import the ArtGenerator component

function App() {
  return (
    <div className="App">
      <h1>Decentralized Art Marketplace</h1>
      <ArtGenerator /> {/* Include the ArtGenerator component */}
    </div>
  );
}

export default App;