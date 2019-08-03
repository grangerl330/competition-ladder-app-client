import React, { Component } from 'react'

class Ladder extends Component {

  constructor(props){
    super(props)

    this.state = {
      ladder: [],
      players: [],
      ladderSpots: [],
      draggedPlayer: [],
      droppedPlayer: [],
      renderedLadderSpots: ""
    }
  }

  componentDidMount(){
    fetch(`/ladders/${this.props.ladderId}`)
    .then(response => response.json())
    .then(ladder => {
      this.setState({ladder: ladder, players: ladder.players})
      this.setLadderSpots()
      this.renderLadderSpots()
    })
  }

  setLadderSpots = () => {
    this.state.players.forEach(player => {
      this.setState({
        ladderSpots: [
          ...this.state.ladderSpots, {
            spot: player.ladder_spot,
            player: player
          }
        ]
      })
    })
  }

  onDragOver = (event) => {
    event.preventDefault()
  }

  onDragStart = (event, player) => {
    console.log('dragstart:', player.first_name, player.last_name)
    this.setState({
      draggedPlayer: player
    })
  }

  onDrop = (event, droppedOnPlayer) => {
    var draggedPlayer = this.state.draggedPlayer

    var ladderSpots = this.state.ladderSpots

    ladderSpots.filter(ladderSpot => ladderSpot.player.id === draggedPlayer.id)

    ladderSpots.filter(ladderSpot => ladderSpot.player.id === droppedOnPlayer.id)

    var newLadderSpots = ladderSpots.filter(ladderSpot => {
      if(ladderSpot.player.id === draggedPlayer.id){
        ladderSpot.player = droppedOnPlayer
      } else if(ladderSpot.player.id === droppedOnPlayer.id) {
        ladderSpot.player = draggedPlayer
      }

      return ladderSpot
    })

    this.setState({
      ...this.state, newLadderSpots
    })

    this.renderLadderSpots()
    console.log(this.state.ladderSpots[0].spot, this.state.ladderSpots[0].player.first_name, this.state.ladderSpots[1].spot, this.state.ladderSpots[1].player.first_name)

  }

  renderLadderSpots = () => {
    const ladderSpotsHTML = this.state.ladderSpots.map(ladderSpot =>
      <div key={ladderSpot.player.id} className="ladder-spot" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, ladderSpot.player)}}>
        <div key={ladderSpot.player.id} className="ladder-player-display" draggable onDragStart={event => this.onDragStart(event, ladderSpot.player)}>
          <h3>{ladderSpot.spot}. {ladderSpot.player.first_name} {ladderSpot.player.last_name}</h3>
        </div>
      </div>
    )

    this.setState({
      renderedLadderSpots: ladderSpotsHTML
    })
  }

  render(){
    return (
      <div className="ladder">
        <div className="ladder-title">
          {this.state.ladder.title}
        </div>
        {this.state.renderedLadderSpots}
      </div>
    )
  }
}

export default Ladder
