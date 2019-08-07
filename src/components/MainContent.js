import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LaddersList from './LaddersList'
import Ladder from './Ladder'
import LadderForm from './LadderForm'
import Profile from './Profile'

class MainContent extends Component {

  render(){
    return(
      <div className='main-content'>
        <Route exact path='/ladders' render={() => <LaddersList />}/>
        <Route exact path='/newladder' render={() => <LadderForm />}/>
        <Route exact path='/ladders/:ladderId' render={(urlData) => <Ladder ladderId={urlData.match.params.ladderId}/>}/>
        <Route exact path='/profile' render={() => <Profile />}/>
      </div>
    )

  }
}

export default MainContent
