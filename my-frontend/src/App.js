import React from 'react';
import BusinessList from './BusinessList'; // Import the component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Business App</h1>
      </header>
      <main>
        <BusinessList /> {/* Use the component */}
      </main>
    </div>
  );
}

export default App;
