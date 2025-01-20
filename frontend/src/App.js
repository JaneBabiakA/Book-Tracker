import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookView from './components/BookView';
import LoginPage from './components/LoginPage';
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { token } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={token ? <HomePage/> : <LoginPage/>}/>
        <Route exact path="/:id" element={token ? <BookView/> : <LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
