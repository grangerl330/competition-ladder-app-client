import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router';
import closeWindow from '../images/close-window.png'

class LadderForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      user_id: props.currentUser.id,
      id: props.ladderId,
      numberOfPlayerInputs: 1,
      spot1: {name: "", id: ""}
    }
  }

  componentDidMount(){
    if(this.props.ladderId){
      fetch(`/ladders/${this.props.ladderId}`)
      .then(response => response.json())
      .then(ladder => {
        this.setState({title: ladder.title, numberOfPlayerInputs: ladder.players.length})

        var sortedPlayers = ladder.players.sort(function(a,b) {return a.ladder_spot - b.ladder_spot})
        sortedPlayers.forEach((player, index) => {
          var playerInfo = {name: player.name, id: player.id}
          this.setState({[`spot${index+1}`]: playerInfo})
        })
      })
    }
  }

  handleOnChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleOnChangePlayer = event => {
    const {name, value} = event.target
    this.setState({
      [name]: {name: value, id: this.state[name].id}
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()

    const ladder = this.state
    var url = ""
    var request = ""

    if(this.props.edit){
      url = '/ladders/update'
      request = {
        method: 'PATCH',
        body: JSON.stringify({
        ladder: ladder
      }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    } else {
      url = '/ladders'
      request = {
        method: 'POST',
        body: JSON.stringify({
          ladder: ladder
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }

    fetch(url, request)
    .then(response => response.json())
    .then(ladder => {
      console.log(ladder)
      this.props.history.push(`/ladders/${ladder.id}`)
    })
  }

  addPlayerInput = (event) => {
    event.preventDefault()
    var newPlayer = `spot${this.state.numberOfPlayerInputs+1}`

    this.setState({[newPlayer]: {name: "", id: ""}})
    this.setState({numberOfPlayerInputs: this.state.numberOfPlayerInputs + 1})
  }

  removePlayerInput = (event) => {
    event.preventDefault()

    this.setState({numberOfPlayerInputs: this.state.numberOfPlayerInputs - 1})
  }

  renderPlayerInputs = () => {
    var number = this.state.numberOfPlayerInputs
    var renderedInputs = []
    for(var i=0; i < number; i++) {
      if(this.state[`spot${i+1}`]){
        renderedInputs.push(
          <p key={i+1} >
            <label>Position {i+1}:</label>
            <input type="text" name={`spot${i+1}`} value={this.state[`spot${i+1}`].name || ''} onChange={this.handleOnChangePlayer}/>
          </p>
        )
      }
    }

    return renderedInputs
  }

  renderTitle = () => {
    if(this.props.edit){
      return <h2>Edit {this.state.title}</h2>
    } else {
      return <h2>Add A New Ladder</h2>
    }
  }

  render(){
    return (
      <div className="ladder">
        <NavLink className="close-window-button" to='/ladders'>
          <img src={closeWindow} alt="Close Window"/>
        </NavLink>
        {this.renderTitle()}
        <form onSubmit={this.handleOnSubmit}>
          <p>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleOnChange}/>
          </p>
          {this.renderPlayerInputs()}
          <button onClick={this.removePlayerInput}>Remove Player Slot</button>
          <button onClick={this.addPlayerInput}>Add Player Slot</button>
          <p>
            <button>Save Ladder</button>
          </p>
        </form>
      </div>
    )
  }
}

export default withRouter(LadderForm)

// Figuring out edit handleOnSubmit vs add handleOnSubmit -> need a different fetch request - Look at tennis journal
