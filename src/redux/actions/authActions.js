import { createAction } from "@reduxjs/toolkit";

export const login = createAction('LOGIN', (data /*informacion del usuario*/ ) =>{ 

    // const roles = Array.isArray(data.role) ? data.role : []

    const clearData ={
        name: data.firstName + " " + data.lastName,
        email: data.email,
        token: data.token,
        expiresIn: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        loggedIn: true,
        isAdmin: data.admin
    }
    return {payload: clearData}
} )

export const logout = createAction('LOGOUT') 