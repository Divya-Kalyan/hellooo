import React, { useState, useEffect } from 'react';
import { getTrendingRecipes, getRecipeDetails } from '../services/recipeService';
import './TrendingBites.css';

const TrendingBites = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingRecipes();
  }, []);

  const fetchTrendingRecipes = async () => {
    try {
      setLoading(true);
      const recipes = await getTrendingRecipes();
      setTrendingRecipes(recipes);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching trending recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipe) => {
    try {
      const detailedRecipe = await getRecipeDetails(recipe.id);
      setSelectedRecipe(detailedRecipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      // Fallback to basic recipe info if API fails
      setSelectedRecipe(recipe);
    }
  };

  if (loading) {
    return (
      <div className="trending-bites-container">
        <div className="trending-bites-content">
          <h2>Trending Bites</h2>
          <div className="loading-message">Loading trending recipes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trending-bites-container">
        <div className="trending-bites-content">
          <h2>Trending Bites</h2>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-bites-container">
      <div className="trending-bites-content">
        <h2>Trending Bites</h2>
        <div className="trending-cards">
          {trendingRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="trending-card"
              onClick={() => handleRecipeClick(recipe)}
            >
              <img src={recipe.image} alt={recipe.title} />
              <div className="card-info">
                <h3>{recipe.title}</h3>
                <div className="card-meta">
                  <span>⏱️ {recipe.readyInMinutes} mins</span>
                  <span>👥 {recipe.servings} servings</span>
                </div>
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
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            
            <div className="recipe-details">
              <div className="nutrition-info">
                <h3>Nutrition Information</h3>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span>Calories</span>
                    <span>{selectedRecipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A'}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Protein</span>
                    <span>{selectedRecipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 'N/A'}g</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Carbs</span>
                    <span>{selectedRecipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 'N/A'}g</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Fat</span>
                    <span>{selectedRecipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 'N/A'}g</span>
                  </div>
                </div>
              </div>

              <div className="recipe-steps">
                <h3>Instructions</h3>
                {selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions.length > 0 ? (
                  <ol>
                    {selectedRecipe.analyzedInstructions[0].steps.map((step, index) => (
                      <li key={index}>{step.step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>No instructions available for this recipe.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingBites; 