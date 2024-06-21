import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "../actions/authActions";

const intialState = {
    loggedIn: false,
    token: '',
    expiresIn: '',
    user: {
        name: '',
        email: ''
    }
}

const authReducer = createReducer(intialState, (builder) => { 
    builder.addCase(login, (state, action) => {
        return {
            ...state,
            user: {
                name: action.payload.name,
                email: action.payload.email
            },
            token: action.payload.token,
            loggedIn: action.payload.loggedIn,
            expiresIn: action.payload.expiresIn
        }
    })
    .addCase(logout, (state, action)=>{
        return intialState
    })
})
export default authReducer