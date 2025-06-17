import React, { useState } from 'react';
import './TrendingBites.css';

const TrendingBites = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const trendingRecipes = [
    {
      id: 1,
      title: "Spicy Thai Curry",
      image: "https://source.unsplash.com/random/400x300/?curry",
      time: "45 mins",
      servings: 4,
      difficulty: "Medium",
      nutrition: {
        calories: 450,
        protein: "25g",
        carbs: "35g",
        fat: "20g"
      },
      steps: [
        "Heat oil in a large pan over medium heat",
        "Add curry paste and stir for 1 minute",
        "Add coconut milk and bring to simmer",
        "Add vegetables and protein of choice",
        "Simmer for 20 minutes until vegetables are tender",
        "Serve with rice and garnish with fresh herbs"
      ]
    },
    {
      id: 2,
      title: "Mediterranean Bowl",
      image: "https://source.unsplash.com/random/400x300/?mediterranean",
      time: "30 mins",
      servings: 2,
      difficulty: "Easy",
      nutrition: {
        calories: 380,
        protein: "20g",
        carbs: "40g",
        fat: "15g"
      },
      steps: [
        "Cook quinoa according to package instructions",
        "Prepare vegetables and protein",
        "Assemble bowl with quinoa base",
        "Add vegetables, protein, and toppings",
        "Drizzle with dressing",
        "Garnish with fresh herbs and feta cheese"
      ]
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      image: "https://source.unsplash.com/random/400x300/?chocolate",
      time: "25 mins",
      servings: 4,
      difficulty: "Medium",
      nutrition: {
        calories: 320,
        protein: "5g",
        carbs: "45g",
        fat: "25g"
      },
      steps: [
        "Preheat oven to 425°F",
        "Melt chocolate and butter together",
        "Mix in sugar and eggs",
        "Fold in flour",
        "Pour into ramekins",
        "Bake for 12-14 minutes"
      ]
    }
  ];

  return (
    <div className="trending-bites-container">
      <div className="trending-bites-content">
        <h2>Trending Bites</h2>
        <div className="trending-cards">
          {trendingRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="trending-card"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <img src={recipe.image} alt={recipe.title} />
              <div className="card-info">
                <h3>{recipe.title}</h3>
                <div className="card-meta">
                  <span>⏱️ {recipe.time}</span>
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
                    <span>{selectedRecipe.nutrition.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Protein</span>
                    <span>{selectedRecipe.nutrition.protein}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Carbs</span>
                    <span>{selectedRecipe.nutrition.carbs}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Fat</span>
                    <span>{selectedRecipe.nutrition.fat}</span>
                  </div>
                </div>
              </div>

              <div className="recipe-steps">
                <h3>Steps</h3>
                <ol>
                  {selectedRecipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
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

export default TrendingBites; 