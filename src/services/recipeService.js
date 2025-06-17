const SPOONACULAR_API_KEY = 'c145467d4810470cb07dc64e21668230';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

const createUrl = (endpoint, params = {}) => {
  const url = new URL(`${SPOONACULAR_BASE_URL}/${endpoint}`);
  url.searchParams.append('apiKey', SPOONACULAR_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

export const searchRecipes = async (filters) => {
  try {
    const params = {
      query: filters.ingredients.join(','),
      maxReadyTime: filters.timeNeeded,
      number: 10,
      addRecipeInformation: true,
      fillIngredients: true,
      instructionsRequired: true
    };

    const url = createUrl('complexSearch', params);
    console.log('Search URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 402) {
        throw new Error('API rate limit reached. Please try again in a few minutes.');
      }
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error in searchRecipes:', error);
    throw new Error(error.message || 'Failed to search recipes');
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const url = createUrl(`${recipeId}/information`, {
      includeNutrition: true
    });
    console.log('Recipe Details URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 402) {
        throw new Error('API rate limit reached. Please try again in a few minutes.');
      }
      throw new Error(`Failed to fetch recipe details: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getRecipeDetails:', error);
    throw new Error(error.message || 'Failed to get recipe details');
  }
};

export const getRandomRecipes = async () => {
  try {
    const url = createUrl('random', {
      number: 6,
      addRecipeInformation: true,
      fillIngredients: true
    });
    console.log('Random Recipes URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 402) {
        throw new Error('API rate limit reached. Please try again in a few minutes.');
      }
      throw new Error(`Failed to fetch random recipes: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Error in getRandomRecipes:', error);
    throw new Error(error.message || 'Failed to get random recipes');
  }
};

export const getTrendingRecipes = async () => {
  try {
    const url = createUrl('complexSearch', {
      sort: 'popularity',
      number: 6,
      addRecipeInformation: true,
      fillIngredients: true
    });
    console.log('Trending Recipes URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 402) {
        throw new Error('API rate limit reached. Please try again in a few minutes.');
      }
      throw new Error(`Failed to fetch trending recipes: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error in getTrendingRecipes:', error);
    throw new Error(error.message || 'Failed to get trending recipes');
  }
}; 