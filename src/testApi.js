const SPOONACULAR_API_KEY = 'c145467d4810470cb07dc64e21668230';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

async function testApiKey() {
  try {
    // Test random recipes endpoint
    const randomUrl = `${SPOONACULAR_BASE_URL}/random?apiKey=${SPOONACULAR_API_KEY}&number=1`;
    console.log('Testing Random Recipes URL:', randomUrl);
    
    const randomResponse = await fetch(randomUrl);
    console.log('Random Response Status:', randomResponse.status);
    
    if (!randomResponse.ok) {
      const errorData = await randomResponse.json();
      console.error('Random API Error:', errorData);
    } else {
      const data = await randomResponse.json();
      console.log('Random API Success:', data);
    }

    // Test complex search endpoint
    const searchUrl = `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=pasta&number=1`;
    console.log('Testing Search URL:', searchUrl);
    
    const searchResponse = await fetch(searchUrl);
    console.log('Search Response Status:', searchResponse.status);
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('Search API Error:', errorData);
    } else {
      const data = await searchResponse.json();
      console.log('Search API Success:', data);
    }

  } catch (error) {
    console.error('Test Error:', error);
  }
}

// Run the test
testApiKey(); 