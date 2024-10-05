import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();  // Get post id from route params
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    if (id) {
      // If there's an id, fetch the existing blog post
      axios.get(`/api/posts/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update an existing post
      axios.put(`/api/posts/${id}`, { title, content })
        .then(() => navigate('/'))  // Navigate back to home after updating
        .catch(error => console.error(error));
    } else {
      // Create a new post
      axios.post('/api/posts', { title, content })
        .then(() => navigate('/'))  // Navigate back to home after creating
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <label>Content:</label>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default BlogForm;
