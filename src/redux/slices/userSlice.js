import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  isAdminLoggedIn: false
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      console.log('state: ', state, 'action: ', action)
      state.user = {...state.user, ...action.payload}
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {}
      state.isLoggedIn = false
      state.isAdminLoggedIn = false
    },
    adminLogIn: (state) => {
      state.isAdminLoggedIn = true
    }
  }
})

export const {signIn, signOut} = userSlice.actions
export default userSlice.reducer