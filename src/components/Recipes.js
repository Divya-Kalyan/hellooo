import React, { useState, useEffect } from 'react';
import { searchRecipes, getRecipeDetails } from '../services/recipeService';
import './Recipes.css';

const Recipes = () => {
  const [filters, setFilters] = useState({
    time: '',
    servings: '',
    customServings: '',
    preference: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mustHaveIngredients, setMustHaveIngredients] = useState([]);

  useEffect(() => {
    const handleIngredientSelected = (event) => {
      const ingredient = event.detail;
      console.log('Received ingredient in Recipes:', ingredient);
      setSelectedIngredients(prev => {
        if (!prev.includes(ingredient)) {
          const newIngredients = [...prev, ingredient];
          console.log('Updated selected ingredients:', newIngredients);
          return newIngredients;
        }
        return prev;
      });
    };

    document.addEventListener('ingredientSelected', handleIngredientSelected);
    return () => {
      document.removeEventListener('ingredientSelected', handleIngredientSelected);
    };
  }, []);

  const handleRemoveIngredient = (ingredientToRemove) => {
    console.log('Removing ingredient:', ingredientToRemove);
    setSelectedIngredients(prev => {
      const newIngredients = prev.filter(ingredient => ingredient !== ingredientToRemove);
      console.log('Updated selected ingredients after removal:', newIngredients);
      return newIngredients;
    });
    setMustHaveIngredients(prev => prev.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleToggleMustHave = (ingredient) => {
    setMustHaveIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'servings' && value !== 'custom' ? { customServings: '' } : {})
    }));
  };

  const handleCustomServingsChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setFilters(prev => ({
        ...prev,
        customServings: value,
        servings: 'custom'
      }));
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes({
        ingredients: selectedIngredients,
        mustHaveIngredients: mustHaveIngredients,
        time: filters.time,
        preference: filters.preference,
        number: 12
      });
      setSearchResults(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipeId) => {
    try {
      const details = await getRecipeDetails(recipeId);
      setSelectedRecipe(details);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="recipes-page">
      <h1 className="title">Find Your Perfect Recipe</h1>

      <div className="selected-ingredients-container">
        <h2 className="title">Added Ingredients</h2>
        <div className="selected-ingredients">
          {selectedIngredients.length > 0 ? (
            selectedIngredients.map((ingredient) => (
              <div 
                key={ingredient} 
                className={`selected-ingredient-chip ${mustHaveIngredients.includes(ingredient) ? 'must-have' : ''}`}
                onClick={() => handleToggleMustHave(ingredient)}
              >
                <span>{ingredient}</span>
                <button
                  className="remove-ingredient"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveIngredient(ingredient);
                  }}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className='ingredient-hint'>No ingredients added yet</p>
          )}
        </div>
        {selectedIngredients.length > 0 && (
          <p className="ingredient-hint">Click on an ingredient to mark it as "must have"</p>
        )}
      </div>

      <div className="recipes-container">
        <div className="recipes-filters">
          <div className="filter-group">
            <h3>Time Needed</h3>
            <select
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Any Time</option>
              <option value="15">15 minutes or less</option>
              <option value="30">30 minutes or less</option>
              <option value="45">45 minutes or less</option>
              <option value="60">1 hour or less</option>
              <option value="90">1.5 hours or less</option>
              <option value="120">2 hours or less</option>
              <option value="180">3 hours or less</option>
              <option value="240">4 hours or less</option>
              <option value="300">5 hours or less</option>
              <option value="360">6 hours or less</option>
              <option value="480">8 hours or less</option>
              <option value="720">12 hours or less</option>
              <option value="1440">24 hours or less</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Servings</h3>
            <select
              name="servings"
              value={filters.servings}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Any Servings</option>
              <option value="1">1 serving</option>
              <option value="2">2 servings</option>
              <option value="4">4 servings</option>
              <option value="6">6 servings</option>
              <option value="8">8 servings</option>
              <option value="10">10 servings</option>
              <option value="12">12 servings</option>
              <option value="custom">Custom servings</option>
            </select>
            {filters.servings === 'custom' && (
              <div className="custom-servings">
                <input
                  type="text"
                  value={filters.customServings}
                  onChange={handleCustomServingsChange}
                  placeholder="Enter number"
                  min="1"
                />
                <span>servings</span>
              </div>
            )}
          </div>

          <div className="filter-group">
            <h3>Preference</h3>
            <select
              name="preference"
              value={filters.preference}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Both</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        <button
          className="search-button"
          onClick={handleSearch}
          disabled={loading || selectedIngredients.length === 0}
        >
          {loading ? 'Searching...' : 'Find Recipes'}
        </button>

        {error && <div className="error-message">{error}</div>}
        
        {loading && <div className="loading-message">Finding the perfect recipes</div>}

        <div className="search-results">
          {searchResults.map(recipe => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <img src={recipe.image} alt={recipe.title} />
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p>Ready in: {recipe.readyInMinutes} minutes</p>
                <p>Servings: {recipe.servings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <div className="recipe-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedRecipe(null)}>×</button>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            
            <div className="recipe-details">
              <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                  {selectedRecipe.extendedIngredients.map(ingredient => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="instructions">
                <h3>Instructions</h3>
                <ol>
                  {selectedRecipe.analyzedInstructions[0]?.steps.map(step => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes; 