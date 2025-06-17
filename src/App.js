import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pantry from './components/Pantry';
import Recipes from './components/Recipes';
import SizzleSuggest from './components/SizzleSuggest';
import TrendingBites from './components/TrendingBites';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientSelect = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="content-wrapper">
          <div className="pantry-section">
            <Pantry onIngredientSelect={handleIngredientSelect} />
          </div>
          <div className="recipes-section">
            <Recipes selectedIngredients={selectedIngredients} onIngredientSelect={handleIngredientSelect} />
          </div>
        </div>
        <div className="suggestions-section">
          <SizzleSuggest />
        </div>
        <div className="trending-section">
          <TrendingBites />
        </div>
      </div>
    </div>
  );
}

export default App; 