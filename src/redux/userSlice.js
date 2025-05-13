import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = false
    },
    loginFailure: (state) => {
      state.loading = false
      state.error = true
    },
    logout: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    },
    subscription: (state, action) => {
      if (!state.currentUser) return

      // If already subscribed, unsubscribe
      if (state.currentUser.subscribedUsers?.includes(action.payload)) {
        state.currentUser.subscribedUsers = state.currentUser.subscribedUsers.filter(
          (channelId) => channelId !== action.payload,
        )
      }
      // Otherwise subscribe
      else {
        state.currentUser.subscribedUsers = [...(state.currentUser.subscribedUsers || []), action.payload]
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions
export default userSlice.reducer

