import { configureStore } from '@reduxjs/toolkit'
import wixDataReducer from '../features/wixData/wixDataSlice'

export default configureStore({
  reducer: {
    wixData: wixDataReducer,
  },
})