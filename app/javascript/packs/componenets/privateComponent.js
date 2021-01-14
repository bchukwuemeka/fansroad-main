import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {  useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
	const current_user = JSON.parse(localStorage.getItem("current_user")) ? true : false;
	console.log('current user', current_user)
	
  return (
    <Route
      {...rest}
      render={props =>
        current_user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute