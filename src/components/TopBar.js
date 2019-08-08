import React from 'react'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'

const TopBar = (props) => {
  return (
    <div className="topbar">
      <div className="topbar-text">
        Virtual Competition Ladder
      </div>
      <div className="username-display">
        <NavLink to='/profile' className="white-link">{props.currentUser.username}</NavLink>
        <div className="logout-display">
          <Logout logout={props.logout}/>
        </div>
      </div>
      <div className="topbar-link">
        <NavLink to='/ladders' className='white-link'>All Ladders</NavLink>
      </div>
    </div>
  )
}

export default TopBar
