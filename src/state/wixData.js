import { produce } from 'immer';
import createAction from './createAction';
import { loadData } from "../services/wixAPI"

export const NAVBAR_LOADING = 'NAVBAR_LOADING';
export const NAVBAR_SUCCESS = 'NAVBAR_SUCCESS';
export const NAVBAR_FAIL = 'NAVBAR_FAIL';

export const HOMEPAGE_LOADING = 'HOMEPAGE_LOADING';
export const HOMEPAGE_SUCCESS = 'HOMEPAGE_SUCCESS';
export const HOMEPAGE_FAIL = 'HOMEPAGE_FAIL';


const initialState = {
    navbarData: [],
    navbarDataLoading: false,
    navbarDataError: "",
    homepageData: {},
    homepageDataLoading: false,
    homepageDataError: ""
}

export default produce((draft, action) => {
    const { type, payload } = action
    switch (type) {
        case NAVBAR_LOADING:
            draft.navbarDataLoading = true
            break
        case NAVBAR_FAIL:
            draft.navbarDataLoading = false
            draft.navbarDataError = payload
            break
        case NAVBAR_SUCCESS:
            draft.navbarData = payload
            draft.navbarDataLoading = false
            break
        case HOMEPAGE_LOADING:
            draft.homepageDataLoading = true
            break
        case HOMEPAGE_FAIL:
            draft.homepageDataLoading = false
            draft.homepageDataError = payload
            break
        case HOMEPAGE_SUCCESS:
            draft.homepageData = payload
            draft.homepageDataLoading = false
            break
    }
}, initialState)

export function fetchNavbarData() {
    return async (dispatch) => {
        let response
        dispatch(createAction(NAVBAR_LOADING))

        try {
            response = await loadData('navbar-links')
        } catch (error) {
            dispatch(createAction(NAVBAR_FAIL, error.message))
        }

        dispatch(createAction(NAVBAR_SUCCESS, response))
    }
}