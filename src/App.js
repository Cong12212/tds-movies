import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <BrowserRouter>
      <SearchComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;