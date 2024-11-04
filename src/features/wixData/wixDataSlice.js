import { createSlice } from '@reduxjs/toolkit'

export const wixDataSlice = createSlice({
  name: 'wixData',
  initialState: {
    navbarData: [],
    navbarDataLoading: false,
    navbarDataError: "",
    homepageData: {},
    homepageDataLoading: false,
    homepageDataError: ""
  },
  reducers: {
    setNavbarData: (state, action) => {
        console.log({state, action})
        state.navbarData = action.payload
        console.log({state, action})
    },
    setNavbarLoading: (state, action) => {
        state.navbarDataLoading = action.payload
    },
    setNavbarDataError: (state, action) => {
        state.navbarDataError = action.payload
    },
    setHomepageData: (state, action) => {
        state.homepageData = action.payload
    },
    setHomepageLoading: (state, action) => {
        state.homepageDataLoading = action.payload
    },
    setHomepageError: (state, action) => {
        state.homepageDataError = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    setNavbarData, 
    setNavbarLoading,
    setNavbarDataError,
    setHomepageData,
    setHomepageLoading,
    setHomepageError
} = wixDataSlice.actions

export default wixDataSlice.reducer