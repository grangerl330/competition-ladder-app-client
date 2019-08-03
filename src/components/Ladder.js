import React, { Component } from 'react'
import LadderSpotCard from './LadderSpotCard'
import { NavLink, Route } from 'react-router-dom'

class Ladder extends Component {

  constructor(props){
    super(props)

    this.state = {
      ladder: [],
      players: []
    }
  }

  componentDidMount(){
    fetch(`/ladders/${this.props.ladderId}`)
    .then(response => response.json())
    .then(ladder => this.setState({ladder: ladder, players: ladder.players}))
  }

  renderSpotCards = () => {
    const spotCards = this.state.players.map(player =>
      <LadderSpotCard player={player} key={player.id} />
    )
    return spotCards
  }

  render(){
    return (
      <div className="ladder">
        <div className="ladder-title">
          {this.state.ladder.title}
          {this.renderSpotCards()}
        </div>

      </div>
    )
  }
}

export default Ladder
