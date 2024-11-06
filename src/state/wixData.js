import { produce } from 'immer'
import createAction from './createAction'
import { loadData } from "../services/wixAPI"

const { 
    REACT_APP_WIX_STATIC_URL,
    REACT_APP_WIX_IMG_PREFIX
} = process.env

export const NAVBAR_LOADING = 'NAVBAR_LOADING'
export const NAVBAR_SUCCESS = 'NAVBAR_SUCCESS'
export const NAVBAR_FAIL = 'NAVBAR_FAIL'

export const FOOTER_LOADING = 'FOOTER_LOADING'
export const FOOTER_SUCCESS = 'FOOTER_SUCCESS'
export const FOOTER_FAIL = 'FOOTER_FAIL'

export const HOMEPAGE_LOADING = 'HOMEPAGE_LOADING'
export const HOMEPAGE_SUCCESS = 'HOMEPAGE_SUCCESS'
export const HOMEPAGE_FAIL = 'HOMEPAGE_FAIL'


const initialState = {
    navbarData: [],
    navbarDataLoading: false,
    navbarDataError: "",
    homepageData: {},
    homepageDataLoading: false,
    homepageDataError: "",
    footerData: {},
    footerDataLoading: false,
    footerDataError: "",
}

export default produce((draft, action) => {
    const { type, payload } = action
    switch (type) {
        case NAVBAR_LOADING:
            draft.navbarDataLoading = payload
            break
        case NAVBAR_FAIL:
            draft.navbarDataLoading = false
            draft.navbarDataError = payload
            break
        case NAVBAR_SUCCESS:
            draft.navbarData = payload
            draft.navbarDataLoading = false
            break
        case FOOTER_LOADING:
            draft.footerDataLoading = payload
            break
        case FOOTER_FAIL:
            draft.footerDataLoading = false
            draft.footerDataError = payload
            break
        case FOOTER_SUCCESS:
            draft.footerData = payload
            draft.footerDataLoading = false
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
        dispatch(createAction(NAVBAR_LOADING, true))

        try {
            response = await loadData('navbar-links')
        } catch (error) {
            dispatch(createAction(NAVBAR_FAIL, error.message))
        }

        dispatch(createAction(NAVBAR_SUCCESS, parseNavbarItems(response)))
    }
}

export function fetchFooterData() {
    return async (dispatch) => {
        let response
        dispatch(createAction(FOOTER_LOADING, true))

        try {
            response = await loadData('footer')
        } catch (error) {
            dispatch(createAction(FOOTER_FAIL, error.message))
        }

        dispatch(createAction(FOOTER_SUCCESS, parseSingleItemCollection(response)))
    }
}

export function fetchHomepageData() {
    return async (dispatch) => {
        let response
        dispatch(createAction(HOMEPAGE_LOADING, true))

        try {
            response = await loadData('homepage')
        } catch (error) {
            dispatch(createAction(HOMEPAGE_FAIL, error.message))
        }

        dispatch(createAction(HOMEPAGE_SUCCESS, parseSingleItemCollection(response)))
    }
}

function parseSingleItemCollection(rawData) {
    const data = rawData.dataItems[0].data
    Object.keys(data).forEach(key => {
        data[key] = processWixImgURL(data[key])
    })
    return data
}

// URL value returned from wix CMS is like this: wix:image://v1/4abd8b_afba7c517e824975be8177a9743354d1~mv2.jpg/....
function processWixImgURL(value) {
    if (typeof value == "string" && value.startsWith(REACT_APP_WIX_IMG_PREFIX)) {
        const parsed = value.replace(REACT_APP_WIX_IMG_PREFIX, "")
        return REACT_APP_WIX_STATIC_URL + parsed.split("/")[1]
    }
    return value
}

function parseNavbarItems(rawData) {
    const arr = rawData.dataItems.map(i => i.data)
    const parsed = arr.filter(i => i.navLevel == 1).sort(sortByField)
    parsed.forEach(p => {
        p.children = arr.filter(i => i.parent == p.title && i.navLevel == 2).sort(sortByField)
    })
    return parsed
}

function sortByField(a, b) {
    return a.sortOrder - b.sortOrder
}