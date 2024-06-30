import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const RoutesAuth = (route) => {

  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  console.log(loggedIn)

  return <Route path={route.path} key={route.key} element={route.element} />;

};

export default RoutesAuth;


/* import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

const RoutesAuth = (route) => {

    const loggedIn = useSelector((state) => state.authReducer.loggedIn)
    return loggedIn && <Route path={route.path} key={route.key} element={route.element} /> 

}

export default RoutesAuth
 */