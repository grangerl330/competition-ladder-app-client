import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'

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
    const laddersLinks = this.state.ladders.map(ladder =>
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
      </div>
    )
  }
}

export default LaddersList
