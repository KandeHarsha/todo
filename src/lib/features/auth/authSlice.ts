import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  status: boolean
  userData: any | null
}

const initialState: Auth = {
  status: false,
  userData: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload.userData
    },
    logout: (state, action) => {
      state.status = false
      state.userData = null
    },
    register: (state, action) => {
      state.status = true
      state.userData = action.payload.userData
    }
  }
})

export const {login, logout, register} = authSlice.actions
export default authSlice.reducer