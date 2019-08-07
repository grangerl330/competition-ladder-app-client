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
      numberOfPlayerInputs: 1,
      player1: ""
    }
  }


  handleOnChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()

    const ladder = this.state

    const request = {
      method: 'POST',
      body: JSON.stringify({
        ladder: ladder
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/ladders', request)
    .then(response => response.json())
    .then(ladder => {
      console.log(ladder)
      this.props.history.push(`/ladders/${ladder.id}`)
    })
  }

  addPlayerInput = (event) => {
    event.preventDefault()
    var newPlayer = `player${this.state.numberOfPlayerInputs+1}`

    this.setState({[newPlayer]: ""})
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
      renderedInputs.push(
        <p key={i+1} >
          <label>Player {i+1}:</label>
          <input type="text" name={`player${i+1}`} value={this.state[`player${i+1}`]} onChange={this.handleOnChange}/>
        </p>
      )
    }

    return renderedInputs
  }

  render(){
    return (
      <div className="ladder">
        <NavLink className="close-window-button" to='/ladders'>
          <img src={closeWindow} alt="Close Window"/>
        </NavLink>
        <h2>Add A New Ladder</h2>
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
