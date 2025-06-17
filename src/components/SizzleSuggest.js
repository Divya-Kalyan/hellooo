import React, { useState, useEffect } from 'react';
import './SizzleSuggest.css';

const SizzleSuggest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestedRecipes = [
    {
      id: 1,
      title: "Quick Pasta Primavera",
      image: "https://source.unsplash.com/random/800x400/?pasta",
      time: "25 mins",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Grilled Salmon with Herbs",
      image: "https://source.unsplash.com/random/800x400/?salmon",
      time: "30 mins",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      image: "https://source.unsplash.com/random/800x400/?stirfry",
      time: "20 mins",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Chocolate Lava Cake",
      image: "https://source.unsplash.com/random/800x400/?chocolate",
      time: "25 mins",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Mediterranean Bowl",
      image: "https://source.unsplash.com/random/800x400/?mediterranean",
      time: "30 mins",
      difficulty: "Easy"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === suggestedRecipes.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000); // Rotate every 30 seconds

    return () => clearInterval(interval);
  }, [suggestedRecipes.length]);

  return (
    <div className="sizzle-suggest-container">
      <div className="sizzle-suggest-content">
        <h2>Sizzle Suggests</h2>
        <div className="suggested-recipe">
          <img 
            src={suggestedRecipes[currentIndex].image} 
            alt={suggestedRecipes[currentIndex].title} 
          />
          <div className="recipe-info">
            <h3>{suggestedRecipes[currentIndex].title}</h3>
            <div className="recipe-meta">
              <span>⏱️ {suggestedRecipes[currentIndex].time}</span>
              <span>📊 {suggestedRecipes[currentIndex].difficulty}</span>
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
    </div>
  );
};

export default SizzleSuggest; 