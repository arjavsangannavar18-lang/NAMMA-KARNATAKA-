import axios from 'axios';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_BASE_URL = 'https://newsapi.org/v2';

export async function fetchKarnatakaNews(category) {
  if (!NEWS_API_KEY) throw new Error('NEWS_API_KEY is not configured. Please add your NewsAPI key to the server .env file.');
  try {
    const response = await axios.get(`${NEWS_BASE_URL}/everything`, {
      params: {
        q: 'Karnataka',
        apiKey: NEWS_API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
        ...(category && { q: `Karnataka ${category}` }),
      },
    });
    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      imageUrl: article.urlToImage,
    }));
  } catch (error) {
    if (error.response?.status === 401) throw new Error('Invalid NewsAPI key.');
    console.error('News API error:', error.message);
    throw error;
  }
}
