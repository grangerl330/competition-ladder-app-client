import React, { Component } from 'react'
import Ladder from './Ladder'
import { NavLink, Route } from 'react-router-dom'

class Home extends Component {
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
      <div key={ladder.id}>
        <p><NavLink to={`/ladders/${ladder.id}`}>{ladder.title}</NavLink></p>
      </div>
    )

    return laddersLinks
  }

  render(){
    return (
      <div className="home">
        <h1>Virtual Ladder App</h1>
        <h2>Your Ladders</h2>
        {this.laddersLinks()}
      </div>
    )
  }
}

export default Home
