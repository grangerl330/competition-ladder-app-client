import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router';

class LoginForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: "",
      email: "",
      password: ""
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

    const credentials = this.state

    this.props.login(credentials)

    this.props.history.push('/ladders')
  }

  render(){
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.handleOnSubmit}>
          <p>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleOnChange}/>
          </p>
          <p>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleOnChange}/>
          </p>
          <p>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleOnChange}/>
          </p>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginForm)
