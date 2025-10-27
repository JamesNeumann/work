import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import FeatureMatrix from './components/FeatureMatrix';

function App() {
  const [showMatrix, setShowMatrix] = useState(false);

  if (showMatrix) {
    return (
      <div className="App">
        <FeatureMatrix />
      </div>
    );
  }

  return (
    <div className="App">
      <LandingPage onEnter={() => setShowMatrix(true)} />
    </div>
  );
}

export default App;
