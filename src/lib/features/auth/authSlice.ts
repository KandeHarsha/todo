import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  name?: string
  email: string
  username?: string
  phone?: string
  role?: string
  password: string
}
interface Auth {
  status: boolean
  userData: UserData | null
  isLoading: boolean
  isError: boolean
  error: string | null
}

const initialState: Auth = {
  status: false,
  userData: null,
  isLoading: false,
  isError: false,
  error: null,
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

// export const register = createAsyncThunk<
//   { userData: UserData },   // Return type on success
//   UserData                  // Argument type
// >(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userData }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to register');
//       }

//       const data = await response.json();
//       return { userData: data }; // Ensure it matches the expected return type
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );


export const {login, logout, register} = authSlice.actions
export default authSlice.reducer