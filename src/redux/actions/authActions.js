import { createAction } from "@reduxjs/toolkit";

export const login = createAction('LOGIN', (data /*informacion del usuario*/ ) =>{ 
    const clearData ={
        name: data.firstName + " " + data.lastName,
        email: data.email,
        token: data.token,
        expiresIn: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        loggedIn: true
    }
    return {payload: clearData}
} )

export const logout = createAction('LOGOUT') 