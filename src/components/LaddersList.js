import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import addIcon from '../images/AddIcon.png'

class LaddersList extends Component {
  constructor(){
    super()

    this.state = {
      ladders: []
    }
  }

  componentDidMount(){
    fetch('/ladders')
    .then(response => response.json())
    .then(data => this.setState({ladders: data}))
  }

  laddersLinks = () => {
    const sortedLadders = this.state.ladders.sort(function(a,b) {return a.id - b.id})
    const laddersLinks = sortedLadders.map(ladder =>
      <div key={ladder.id} className="ladder-link-box">
        <NavLink to={`/ladders/${ladder.id}`} className='ladder-link'>{ladder.title}</NavLink>
      </div>
    )

    return laddersLinks
  }

  render(){
    return (
      <div className="ladders-list">
        <h2>Your Ladders</h2>
        {this.laddersLinks()}
        <NavLink to='/newladder'>
          <img src={addIcon} alt="Add Ladder"/>
        </NavLink>
      </div>
    )
  }
}

export default LaddersList
