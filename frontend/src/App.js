import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import BookView from './components/BookView';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/book/:id" element={<BookView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
