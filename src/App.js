import React, {Component} from 'react';
import MainContent from './components/MainContent'
import TopBar from './components/TopBar'
import LoginPage from './components/LoginPage'
import { withRouter } from 'react-router';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state = {
      currentUser: ""
    }
  }

  componentDidMount(){
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    const request = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/get_current_user', request)
    .then(response => response.json())
    .then(user => {
      if (user.notice) {
        console.log(user.notice)
        this.props.history.push('/')
      } else {
        this.setState({currentUser: user})
      }
    })
  }

  login = (credentials) => {
    const request = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }

    fetch('/login', request)
    .then(response => response.json())
    .then(user => {
      if (user.error) {
        alert(user.error)
        this.props.history.push('/')
      } else {
        this.setState({currentUser: user})
      }
    })
  }

  logout = () => {
    fetch('/logout', {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.notice)
      this.setState({currentUser: ""})
    })
  }


  render(){
    if(this.state.currentUser !== ""){
      return (
        <div className="App">
          <TopBar currentUser={this.state.currentUser} logout={this.logout}/>
          <MainContent currentUser={this.state.currentUser}/>
        </div>
      )
    } else {
      return (
        <div>
          <LoginPage login={this.login}/>
        </div>
      )
    }
  }
}

export default withRouter(App);
