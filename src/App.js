import React from 'react';
import MainContent from './components/MainContent'
import TopBar from './components/TopBar'
import { NavLink, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <TopBar />
      <MainContent />
    </div>
  );
}

export default App;
