import React from 'react'

const Profile = (props) => {
  return (
    <div>
      <h1>Profile</h1>
      <p><b>Username:</b> {props.currentUser.username}</p>
      <p><b>Email:</b> {props.currentUser.email}</p>
    </div>
  )
}

export default Profile
