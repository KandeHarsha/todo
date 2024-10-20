import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  name?: string
  email: string
  username?: string
  phone?: string
}
interface Auth {
  status: boolean
  userData: UserData | null
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
    logout: (state) => {
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