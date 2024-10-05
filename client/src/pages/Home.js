import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts. Please try again.');
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h2>Welcome to SBlogs</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create a post!</p>
      ) : (
        posts.map(post => (
          <div className="post-preview" key={post._id}>
            <h3>{post.title}</h3>
            <div className="post-content-preview">
              {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
            </div>
            <Link to={`/post/${post._id}`} className="read-more" >View Post</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
