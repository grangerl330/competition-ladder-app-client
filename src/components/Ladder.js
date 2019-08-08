import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router';
import deleteBin from '../images/delete-bin.png'
import editPencil from '../images/edit-pencil.png'

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
    const sortedPlayers = this.state.players.sort(function(a,b) {return a.ladder_spot - b.ladder_spot})

    sortedPlayers.forEach(player => {
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
    console.log('dragstart:', player.name)
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
    console.log(this.state.ladderSpots[0].spot, this.state.ladderSpots[0].player.name, this.state.ladderSpots[1].spot, this.state.ladderSpots[1].player.name)

    this.saveLadderInDatabase()
  }

  renderLadderSpots = () => {
    const ladderSpotsHTML = this.state.ladderSpots.map(ladderSpot =>
      <div key={ladderSpot.player.id} className="ladder-spot" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, ladderSpot.player)}}>
        <div key={ladderSpot.player.id} className="ladder-player-display" draggable onDragStart={event => this.onDragStart(event, ladderSpot.player)}>
          {ladderSpot.spot}. {ladderSpot.player.name}
        </div>
      </div>
    )

    this.setState({
      renderedLadderSpots: ladderSpotsHTML
    })
  }

  saveLadderInDatabase = () => {
    const request = {
      method: 'PATCH',
      body: JSON.stringify({
        ladderSpots: this.state.ladderSpots
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/players', request)
    .then(response => response.json())
    .then(data => console.log(data.notice))
  }

  deleteLadder = () => {
    const request = {
      method: 'DELETE',
      body: JSON.stringify({
        ladderId: this.state.ladder.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`/ladders/${this.state.ladder.id}`, request)
    .then(response => response.json())
    .then(data => console.log(data.notice))

    this.props.history.push('/ladders')
  }

  render(){
    return (
      <div className="ladder">
        <div className="ladder-title">
          {this.state.ladder.title}
          <div className="ladder-icons">
            <NavLink to={`/ladders/${this.state.ladder.id}/edit`}>
              <img src={editPencil} alt="Edit Ladder"/>
            </NavLink>
            <img src={deleteBin} alt="Delete Ladder" onClick={() => { if(window.confirm('Are you sure you want to delete this ladder?')) this.deleteLadder()}} className="delete"/>
          </div>
        </div>
        {this.state.renderedLadderSpots}
      </div>
    )
  }
}

export default withRouter(Ladder)
