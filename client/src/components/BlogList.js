import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
