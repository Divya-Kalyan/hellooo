import React, { useState } from "react";
import "./Pantry.css";

const Pantry = () => {
  const [activeCategory, setActiveCategory] = useState('Vegetables');

  const categories = {
    'Vegetables': [
      'Carrots', 'Onions', 'Potatoes', 'Tomatoes', 'Bell Peppers', 'Broccoli', 'Spinach', 'Mushrooms',
      'Cucumber', 'Zucchini', 'Eggplant', 'Cauliflower', 'Cabbage', 'Kale', 'Lettuce', 'Celery',
      'Green Beans', 'Peas', 'Corn', 'Asparagus', 'Brussels Sprouts', 'Sweet Potato', 'Pumpkin',
      'Radish', 'Beetroot', 'Turnip', 'Artichoke', 'Okra', 'Bok Choy', 'Arugula', 'Watercress'
    ],
    'Fruits': [
      'Apples', 'Bananas', 'Oranges', 'Berries', 'Lemons', 'Limes', 'Grapes', 'Pineapple',
      'Mango', 'Peach', 'Pear', 'Plum', 'Cherry', 'Kiwi', 'Pomegranate', 'Watermelon',
      'Cantaloupe', 'Honeydew', 'Strawberry', 'Raspberry', 'Blueberry', 'Blackberry',
      'Coconut', 'Papaya', 'Guava', 'Passion Fruit', 'Dragon Fruit', 'Lychee', 'Fig',
      'Date', 'Prune', 'Raisin', 'Cranberry', 'Gooseberry'
    ],
    'Proteins': [
      'Chicken', 'Beef', 'Fish', 'Tofu', 'Eggs', 'Pork', 'Turkey', 'Shrimp',
      'Salmon', 'Tuna', 'Cod', 'Tilapia', 'Lamb', 'Duck', 'Quail', 'Venison',
      'Tempeh', 'Seitan', 'Lentils', 'Chickpeas', 'Black Beans', 'Kidney Beans',
      'Pinto Beans', 'Crab', 'Lobster', 'Mussels', 'Clams', 'Squid', 'Octopus',
      'Quinoa', 'Edamame', 'Peanuts', 'Almonds', 'Cashews', 'Walnuts'
    ],
    'Dairy': [
      'Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Sour Cream', 'Cottage Cheese',
      'Cheddar', 'Mozzarella', 'Parmesan', 'Feta', 'Ricotta', 'Brie', 'Camembert',
      'Gouda', 'Swiss', 'Provolone', 'Blue Cheese', 'Goat Cheese', 'Cream Cheese',
      'Greek Yogurt', 'Kefir', 'Buttermilk', 'Heavy Cream', 'Half and Half',
      'Whipped Cream', 'Condensed Milk', 'Evaporated Milk', 'Ice Cream'
    ],
    'Grains': [
      'Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Flour', 'Cereal',
      'Brown Rice', 'Basmati Rice', 'Jasmine Rice', 'Wild Rice', 'Barley',
      'Bulgur', 'Couscous', 'Polenta', 'Millet', 'Amaranth', 'Buckwheat',
      'Spaghetti', 'Penne', 'Fettuccine', 'Linguine', 'Macaroni', 'Lasagna',
      'Whole Wheat Bread', 'Sourdough', 'Rye Bread', 'Pita Bread', 'Tortillas',
      'Bagels', 'English Muffins', 'Croissants', 'Muffins', 'Pancakes'
    ],
    'Spices': [
      'Salt', 'Pepper', 'Garlic', 'Cumin', 'Paprika', 'Oregano', 'Basil', 'Thyme',
      'Rosemary', 'Sage', 'Dill', 'Mint', 'Cinnamon', 'Nutmeg', 'Cloves', 'Cardamom',
      'Turmeric', 'Ginger', 'Cayenne', 'Chili Powder', 'Coriander', 'Fennel',
      'Mustard Seeds', 'Fenugreek', 'Star Anise', 'Bay Leaves', 'Tarragon',
      'Marjoram', 'Parsley', 'Chives', 'Curry Powder', 'Garam Masala',
      'Five Spice', 'Za\'atar', 'Sumac', 'Saffron', 'Vanilla'
    ],
    'Herbs': [
      'Basil', 'Parsley', 'Cilantro', 'Mint', 'Rosemary', 'Thyme', 'Sage',
      'Oregano', 'Dill', 'Chives', 'Tarragon', 'Marjoram', 'Bay Leaves',
      'Lemongrass', 'Lavender', 'Fennel', 'Chervil', 'Sorrel', 'Borage',
      'Lemon Balm', 'Catnip', 'Hyssop', 'Lovage', 'Savory', 'Stevia'
    ],
    'Nuts & Seeds': [
      'Almonds', 'Walnuts', 'Cashews', 'Pecans', 'Pistachios', 'Hazelnuts',
      'Macadamia', 'Brazil Nuts', 'Pine Nuts', 'Peanuts', 'Sunflower Seeds',
      'Pumpkin Seeds', 'Sesame Seeds', 'Chia Seeds', 'Flax Seeds', 'Hemp Seeds',
      'Poppy Seeds', 'Pine Nuts', 'Chestnuts', 'Pili Nuts', 'Baruka Nuts'
    ]
  };

  const handleIngredientClick = (ingredient) => {
    console.log('Dispatching ingredient:', ingredient);
    const event = new CustomEvent('ingredientSelected', {
      detail: ingredient,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="pantry-container">
      <h2>Your Pantry</h2>
      
      <div className="category-tabs">
        {Object.keys(categories).map(category => (
                <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            >
            {category}
            </button>
        ))}
      </div>

      <div className="category-items">
        {categories[activeCategory].map(ingredient => (
          <div
                    key={ingredient}
            className="ingredient-item"
                    onClick={() => handleIngredientClick(ingredient)}
                  >
                    {ingredient}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry; 