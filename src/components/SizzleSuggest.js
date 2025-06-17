import React, { useState, useEffect } from 'react';
import { getRandomRecipes, getRecipeDetails } from '../services/recipeService';
import './SizzleSuggest.css';

const SizzleSuggest = () => {
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchSuggestedRecipes();
  }, []);

  useEffect(() => {
    if (suggestedRecipes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === suggestedRecipes.length - 1 ? 0 : prevIndex + 1
        );
      }, 30000); // Rotate every 30 seconds

      return () => clearInterval(interval);
    }
  }, [suggestedRecipes.length]);

  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = 'hidden'; // Disable scroll when modal is open
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scroll when modal is closed
    }

    return () => {
      document.body.style.overflow = 'auto'; // Ensure scroll is restored on unmount
    };
  }, [selectedRecipe]);

  const fetchSuggestedRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getRandomRecipes();
      setSuggestedRecipes(recipes);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching suggested recipes:', error);
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

  if (loading) {
    return (
      <div className="sizzle-suggest-container">
        <div className="sizzle-suggest-content">
          <h2>Sizzle Suggests</h2>
          <div className="loading-message">Loading recipe suggestions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sizzle-suggest-container">
        <div className="sizzle-suggest-content">
          <h2>Sizzle Suggests</h2>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (suggestedRecipes.length === 0) {
    return (
      <div className="sizzle-suggest-container">
        <div className="sizzle-suggest-content">
          <h2>Sizzle Suggests</h2>
          <div className="error-message">No recipes available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="sizzle-suggest-container">
      <div className="sizzle-suggest-content">
        <h2>Sizzle Suggests</h2>
        <div
          className="suggested-recipe"
          onClick={() => handleRecipeClick(suggestedRecipes[currentIndex].id)}
        >
          <img
            src={suggestedRecipes[currentIndex].image}
            alt={suggestedRecipes[currentIndex].title}
          />
          <div className="recipe-info">
            <h3>{suggestedRecipes[currentIndex].title}</h3>
            <div className="recipe-meta">
              <span>⏱️ {suggestedRecipes[currentIndex].readyInMinutes} mins</span>
              <span>📊 {suggestedRecipes[currentIndex].servings} servings</span>
            </div>
          </div>
        </div>
        <div className="recipe-indicators">
          {suggestedRecipes.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <div className="recipe-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedRecipe(null)}>
              ×
            </button>
            <h2>{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />

            <div className="recipe-details">
              <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                  {selectedRecipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="instructions">
                <h3>Instructions</h3>
                <ol>
                  {selectedRecipe.analyzedInstructions[0]?.steps.map((step) => (
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

export default SizzleSuggest;

