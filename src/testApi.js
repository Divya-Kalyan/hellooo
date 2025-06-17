const SPOONACULAR_API_KEY = 'c145467d4810470cb07dc64e21668230';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

async function testApiKey() {
  console.log('=== Testing Spoonacular API ===');
  console.log('API Key:', SPOONACULAR_API_KEY);
  console.log('Base URL:', SPOONACULAR_BASE_URL);

  try {
    // Test random recipes endpoint
    const randomUrl = `${SPOONACULAR_BASE_URL}/random?apiKey=${SPOONACULAR_API_KEY}&number=1`;
    console.log('\n1. Testing Random Recipes URL:', randomUrl);
    
    const randomResponse = await fetch(randomUrl);
    console.log('Random Response Status:', randomResponse.status);
    console.log('Random Response Headers:', Object.fromEntries(randomResponse.headers.entries()));
    
    if (!randomResponse.ok) {
      const errorData = await randomResponse.json();
      console.error('❌ Random API Error:', errorData);
    } else {
      const data = await randomResponse.json();
      console.log('✅ Random API Success:', data);
    }

    // Test complex search endpoint
    const searchUrl = `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=pasta&number=1`;
    console.log('\n2. Testing Search URL:', searchUrl);
    
    const searchResponse = await fetch(searchUrl);
    console.log('Search Response Status:', searchResponse.status);
    console.log('Search Response Headers:', Object.fromEntries(searchResponse.headers.entries()));
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('❌ Search API Error:', errorData);
    } else {
      const data = await searchResponse.json();
      console.log('✅ Search API Success:', data);
    }

    // Test trending recipes endpoint
    const trendingUrl = `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&sort=popularity&number=3`;
    console.log('\n3. Testing Trending URL:', trendingUrl);
    
    const trendingResponse = await fetch(trendingUrl);
    console.log('Trending Response Status:', trendingResponse.status);
    
    if (!trendingResponse.ok) {
      const errorData = await trendingResponse.json();
      console.error('❌ Trending API Error:', errorData);
    } else {
      const data = await trendingResponse.json();
      console.log('✅ Trending API Success:', data);
    }

  } catch (error) {
    console.error('❌ Test Error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
}

// Run the test
testApiKey(); 