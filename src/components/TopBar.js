import React from 'react'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'

const TopBar = (props) => {
  return (
    <div className="topbar">
      <div className="topbar-text">
        Virtual Ladder App
      </div>
      <div className="username-display">
        <NavLink to='/profile' className="top-bar-link">{props.currentUser.username}</NavLink>
        <div className="logout-display">
          <Logout logout={props.logout}/>
        </div>
      </div>
      <p>
        <NavLink to='/ladders' className='top-bar-link'>All Ladders</NavLink>
      </p>
    </div>
  )
}

export default TopBar
