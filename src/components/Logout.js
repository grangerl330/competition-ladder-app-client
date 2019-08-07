import React from 'react'
import { withRouter } from 'react-router'

const Logout = (props) => {
  const handleOnSubmit = event => {
    event.preventDefault()

    props.logout()
    props.history.push('/')
  }

  return (
    <div className="logout">
      <form onSubmit={handleOnSubmit}>
        <input type="submit" value="Log Out" className="button" />
      </form>
    </div>
  )
}

export default withRouter(Logout)
