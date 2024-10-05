const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

// Add other API calls here...
