import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
<<<<<<< HEAD
  isAdminLoggedIn: false
=======
>>>>>>> Team: Redux persist store for loggedin user
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
<<<<<<< HEAD
=======
      console.log('state: ', state, 'action: ', action)
>>>>>>> Team: Redux persist store for loggedin user
      state.user = {...state.user, ...action.payload}
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {}
      state.isLoggedIn = false
<<<<<<< HEAD
      state.isAdminLoggedIn = false
    },
    adminLogIn: (state) => {
      state.isAdminLoggedIn = true
=======
>>>>>>> Team: Redux persist store for loggedin user
    }
  }
})

export const {signIn, signOut} = userSlice.actions
export default userSlice.reducer