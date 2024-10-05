import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import Post from './pages/Post';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Post />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/edit/:id" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
