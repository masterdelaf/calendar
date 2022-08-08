import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // authenticated, not-autehenticated
        user: {},
        errorMesage: undefined,

    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking'
            state.user = {}
            state.errorMesage = undefined
        },
        onLogin: ( state, { payload }) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMesage = undefined
        },
        onLogout: ( state, { payload }) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.errorMesage = payload
        },
        clearMessage: ( state ) => {
            state.errorMesage = undefined
        }
    }
})


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearMessage  } = authSlice.actions