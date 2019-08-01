import React, { Component } from 'react'
import LadderSpotCard from './LadderSpotCard'

class Ladder extends Component {

  constructor(){
    super()

    this.state = {
      players: []
    }
  }

  componentDidMount(){
    fetch('/players?ladderId=1')
    .then(response => response.json())
    .then(data => this.setState({players: data}))
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
        <h1>Ladder Name</h1>
        {this.renderSpotCards()}
      </div>
    )
  }
}

export default Ladder
