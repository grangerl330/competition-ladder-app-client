import React from 'react';
import Home from './components/Home'
import Ladder from './components/Ladder'
import TopBar from './components/TopBar'
import { NavLink, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <TopBar />
      <Route exact path='/home' render={() => <Home />}/>
      <Route exact path='/ladders/:ladderId' render={(urlData) => <Ladder ladderId={urlData.match.params.ladderId}/>}/>
    </div>
  );
}

export default App;
