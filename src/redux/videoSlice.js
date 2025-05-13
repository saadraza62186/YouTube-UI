import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
}

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.currentVideo = action.payload
      state.error = false
    },
    fetchFailure: (state) => {
      state.loading = false
      state.error = true
    },
    like: (state, action) => {
      if (!state.currentVideo) return

      // If user already liked, remove like
      if (state.currentVideo.likes?.includes(action.payload)) {
        state.currentVideo.likes = state.currentVideo.likes.filter((userId) => userId !== action.payload)
      }
      // Otherwise add like and remove from dislikes if present
      else {
        state.currentVideo.likes = [...(state.currentVideo.likes || []), action.payload]
        state.currentVideo.dislikes = state.currentVideo.dislikes?.filter((userId) => userId !== action.payload) || []
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo) return

      // If user already disliked, remove dislike
      if (state.currentVideo.dislikes?.includes(action.payload)) {
        state.currentVideo.dislikes = state.currentVideo.dislikes.filter((userId) => userId !== action.payload)
      }
      // Otherwise add dislike and remove from likes if present
      else {
        state.currentVideo.dislikes = [...(state.currentVideo.dislikes || []), action.payload]
        state.currentVideo.likes = state.currentVideo.likes?.filter((userId) => userId !== action.payload) || []
      }
    },
  },
})

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions
export default videoSlice.reducer

