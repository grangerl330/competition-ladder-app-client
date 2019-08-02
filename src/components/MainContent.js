import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import Ladder from './Ladder'

class MainContent extends Component {


  render(){
    return(
      <div className='main-content'>
        <Route exact path='/home' render={() => <Home />}/>
        <Route exact path='/ladders/:ladderId' render={(urlData) => <Ladder ladderId={urlData.match.params.ladderId}/>}/>
      </div>
    )

  }
}

export default MainContent
