import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const RoutesNoAuth = (route) => {

  return <Route path={route.path} key={route.key} element={route.element} />;
  
};

export default RoutesNoAuth;


/* 

import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

const RoutesNoAuth = (route) => {

    const loggedIn = useSelector((state) => state.authReducer.loggedIn)
    return !loggedIn && <Route path={route.path} key={route.key} element={route.element} />

}

export default RoutesNoAuth */