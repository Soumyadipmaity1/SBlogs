const API_BASE_URL = 'https://s-blogs.vercel.app/api';

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

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Add other API calls here (update, delete, etc.)
