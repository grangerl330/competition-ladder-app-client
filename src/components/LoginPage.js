import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = (props) => {

  return(
    <div>
      <LoginForm login={props.login}/>
    </div>
  )

}

export default LoginPage
