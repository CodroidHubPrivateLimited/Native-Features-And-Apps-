
const API_KEY = '3b5ff467fe85263cf2054ff6e0daa2a9';
const BASE_URL = 'https://gnews.io/api/v4';

// Fetch news articles
export async function fetchNews(query: string = 'news', max: number = 10) {
  try {
    const url = `${BASE_URL}/search?q=${query}&lang=en&max=${max}&apikey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Fetch top headlines
export async function fetchTopHeadlines(category: string = 'general', max: number = 10) {
  try {
    const url = `${BASE_URL}/top-headlines?category=${category}&lang=en&max=${max}&apikey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch headlines');
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return [];
  }
}




