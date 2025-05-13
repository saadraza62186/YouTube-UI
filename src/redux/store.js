import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import videoReducer from './videoSlice'
import { videoSlice } from './videoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
})
export default store;