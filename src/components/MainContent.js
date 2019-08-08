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
        <Route exact path='/newladder' render={() => <LadderForm currentUser={this.props.currentUser}/>}/>
        <Route exact path='/ladders/:ladderId' render={(urlData) => <Ladder ladderId={urlData.match.params.ladderId}/>}/>
        <Route exact path='/ladders/:ladderId/edit' render={(urlData) => <LadderForm ladderId={urlData.match.params.ladderId} currentUser={this.props.currentUser} edit="edit"/>}/>
        <Route exact path='/profile' render={() => <Profile currentUser={this.props.currentUser}/>}/>
      </div>
    )
  }
}

export default MainContent
