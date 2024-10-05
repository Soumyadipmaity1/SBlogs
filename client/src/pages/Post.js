import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          setError('Error fetching post. Please try again.');
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required!');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content });
      } else {
        await axios.post('http://localhost:5000/api/posts', { title, content });
      }
      navigate('/');
    } catch (error) {
      setError('Error saving post. Please try again.');
      console.error('Error saving post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="post">
      <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isLoading}>
          {id ? 'Update' : 'Create'} Post
        </button>
      </form>
    </div>
  );
};

export default Post;