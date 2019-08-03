import React, { Component } from 'react'
import LadderSpotCard from './LadderSpotCard'
import { NavLink, Route } from 'react-router-dom'

class Ladder extends Component {

  constructor(props){
    super(props)

    this.state = {
      players: []
    }
  }

  componentDidMount(){
    fetch(`/players?ladderId=${this.props.ladderId}`)
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
        <div className="ladder-title">
          Ladder Name
        </div>
        {this.renderSpotCards()}
      </div>
    )
  }
}

export default Ladder
