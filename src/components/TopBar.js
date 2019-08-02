import React from 'react'
import { NavLink, Route } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <div className="topbar-logo-text">
          Virtual Ladder App
        </div>
      </div>
      <p>
        <NavLink to='/home' className='top-bar-link'>Home</NavLink>
        <NavLink to='/profile' className='top-bar-link'>Profile</NavLink>
      </p>
    </div>
  )
}

export default TopBar
