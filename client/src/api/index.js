const API_BASE_URL = 'https://s-blogs.vercel.app/api';

export const fetchPosts = async () => {
  try {
    console.log('Fetching posts from:', `${API_BASE_URL}/posts`);
    const response = await fetch(`${API_BASE_URL}/posts`, {
      credentials: 'include'
    });
    console.log('Response status:', response.status);
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
    console.log('Creating post:', postData);
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include'
    });
    console.log('Create post response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Created post:', data);
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

