const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://s-blogs.vercel.app/api'
  : 'http://localhost:5000/api';

export const fetchPosts = async () => {
  try {
    console.log('Fetching posts from:', `${API_BASE_URL}/posts`);
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched posts:', data);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Add similar error handling and logging to other API calls
