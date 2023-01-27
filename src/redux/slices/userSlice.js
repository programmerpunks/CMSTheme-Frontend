import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {},
  isLoggedIn: false,
<<<<<<< HEAD
<<<<<<< HEAD
  isAdminLoggedIn: false
=======
>>>>>>> Team: Redux persist store for loggedin user
=======
  isAdminLoggedIn: false
>>>>>>> Teams: Code Optimized by making seperate card component
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
<<<<<<< HEAD
=======
>>>>>>> Teams: Code Optimized by making seperate card component
      state.isAdminLoggedIn = false
    },
    adminLogIn: (state) => {
      state.isAdminLoggedIn = true
<<<<<<< HEAD
=======
>>>>>>> Team: Redux persist store for loggedin user
=======
>>>>>>> Teams: Code Optimized by making seperate card component
    }
  }
})

export const {signIn, signOut, adminLogIn} = userSlice.actions
export default userSlice.reducer