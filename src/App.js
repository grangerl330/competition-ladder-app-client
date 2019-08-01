import React from 'react';
import Home from './components/Home'
import Ladder from './components/Ladder'
import { NavLink, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/home' render={() => <Home />}/>
      <Route exact path='/ladders/:ladderId' render={() => <Ladder />}/>
    </div>
  );
}

export default App;
