import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router';

class LadderForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      size: "",
      user_id: props.currentUser.id
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
    .then(ladder => console.log(ladder))

    this.props.history.push('/ladders')
  }

  render(){
    return (
      <div className="ladder-form">
        <NavLink className="close-window-button" to='/ladders'>x</NavLink>
        <h2>Add A New Ladder</h2>
        <form onSubmit={this.handleOnSubmit}>
          <p>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleOnChange}/>
          </p>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

export default withRouter(LadderForm)
