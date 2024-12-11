import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchComponent from './components/AppBar';
import SearchResult from './components/SearchResult';
import MovieDetail from './components/MovieDetail';
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <SearchComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;