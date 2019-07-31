import React, { Component } from 'react'
import LadderSpotCard from './LadderSpotCard'

class Ladder extends Component {

  constructor(){
    super()

    this.state = {
      players: []
    }
  }

  render(){
    return (
      <div className="ladder">
        <h1>Virtual Club Ladder</h1>
        <LadderSpotCard />
      </div>
    )
  }
}

export default Ladder
