import { produce } from 'immer'
import createAction from './createAction'
import { loadData } from "../services/wixAPI"
import { create } from '@mui/material/styles/createTransitions'

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

export const SOFTWARE_LOADING = 'SOFTWARE_LOADING'
export const SOFTWARE_SUCCESS = 'SOFTWARE_SUCCESS'
export const SOFTWARE_FAIL = 'SOFTWARE_FAIL'

export const SOFTWARE_RESUME_LOADING = 'SOFTWARE_RESUME_LOADING'
export const SOFTWARE_RESUME_SUCCESS = 'SOFTWARE_RESUME_SUCCESS'
export const SOFTWARE_RESUME_FAIL = 'SOFTWARE_RESUME_FAIL'

export const SOFTWARE_TECHNOLOGIES_LOADING = 'SOFTWARE_TECHNOLOGIES_LOADING'
export const SOFTWARE_TECHNOLOGIES_SUCCESS = 'SOFTWARE_TECHNOLOGIES_SUCCESS'
export const SOFTWARE_TECHNOLOGIES_FAIL = 'SOFTWARE_TECHNOLOGIES_FAIL'

export const MUSIC_LOADING = 'MUSIC_LOADING'
export const MUSIC_SUCCESS = 'MUSIC_SUCCESS'
export const MUSIC_FAIL = 'MUSIC_FAIL'

export const MUSIC_RESUME_LOADING = 'MUSIC_RESUME_LOADING'
export const MUSIC_RESUME_SUCCESS = 'MUSIC_RESUME_SUCCESS'
export const MUSIC_RESUME_FAIL = 'MUSIC_RESUME_FAIL'

export const MUSIC_RESOURCES_LOADING = 'MUSIC_RESOURCES_LOADING'
export const MUSIC_RESOURCES_SUCCESS = 'MUSIC_RESOURCES_SUCCESS'
export const MUSIC_RESOURCES_FAIL = 'MUSIC_RESOURCES_FAIL'

export const MUSIC_EVENTS_LOADING = 'MUSIC_EVENTS_LOADING'
export const MUSIC_EVENTS_SUCCESS = 'MUSIC_EVENTS_SUCCESS'
export const MUSIC_EVENTS_FAIL = 'MUSIC_EVENTS_FAIL'

const initialState = {
    navbarData: [],
    navbarDataLoading: false,
    navbarDataError: "",
    footerData: {},
    footerDataLoading: false,
    footerDataError: "",
    homepageData: {},
    homepageDataLoading: false,
    homepageDataError: "",
    softwareData: {},
    softwareDataLoading: false,
    softwareDataError: "",
    softwareResumeData: {},
    softwareResumeDataLoading: false,
    softwareResumeDataError: "",
    softwareTechnologiesData: {},
    softwareTechnologiesDataLoading: false,
    softwareTechnologiesDataError: "",
    musicData: {},
    musicDataLoading: false,
    musicDataError: "",
    musicResumeData: {},
    musicResumeDataLoading: false,
    musicResumeDataError: "",
    musicResourcesData: {},
    musicResourcesDataLoading: false,
    musicResourcesDataError: "",
    musicEventsData: {},
    musicEventsDataLoading: false,
    musicEventsDataError: "",
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
        case SOFTWARE_LOADING:
            draft.softwareDataLoading = true
            break
        case SOFTWARE_FAIL:
            draft.softwareDataLoading = false
            draft.softwareDataError = payload
            break
        case SOFTWARE_SUCCESS:
            draft.softwareData = payload
            draft.softwareDataLoading = false
            break
        case SOFTWARE_RESUME_LOADING:
            draft.softwareResumeDataLoading = true
            break
        case SOFTWARE_RESUME_FAIL:
            draft.softwareResumeDataLoading = false
            draft.softwareResumeDataError = payload
            break
        case SOFTWARE_RESUME_SUCCESS:
            draft.softwareResumeData = payload
            draft.softwareResumeDataLoading = false
            break
        case SOFTWARE_TECHNOLOGIES_LOADING:
            draft.softwareTechnologiesDataLoading = true
            break
        case SOFTWARE_TECHNOLOGIES_FAIL:
            draft.softwareTechnologiesDataLoading = false
            draft.softwareTechnologiesDataError = payload
            break
        case SOFTWARE_TECHNOLOGIES_SUCCESS:
            draft.softwareTechnologiesData = payload
            draft.softwareTechnologiesDataLoading = false
            break
        case MUSIC_LOADING:
            draft.musicDataLoading = true
            break
        case MUSIC_FAIL:
            draft.musicDataLoading = false
            draft.musicDataError = payload
            break
        case MUSIC_SUCCESS:
            draft.musicData = payload
            draft.musicDataLoading = false
            break
        case MUSIC_RESUME_LOADING:
            draft.musicResumeDataLoading = true
            break
        case MUSIC_RESUME_FAIL:
            draft.musicResumeDataLoading = false
            draft.musicResumeDataError = payload
            break
        case MUSIC_RESUME_SUCCESS:
            draft.musicResumeData = payload
            draft.musicResumeDataLoading = false
            break
        case MUSIC_RESOURCES_LOADING:
            draft.musicResourcesDataLoading = true
            break
        case MUSIC_RESOURCES_FAIL:
            draft.musicResourcesDataLoading = false
            draft.musicResourcesDataError = payload
            break
        case MUSIC_RESOURCES_SUCCESS:
            draft.musicResourcesData = payload
            draft.musicResourcesDataLoading = false
            break
        case MUSIC_EVENTS_LOADING:
            draft.musicEventsDataLoading = true
            break
        case MUSIC_EVENTS_FAIL:
            draft.musicEventsDataLoading = false
            draft.musicEventsDataError = payload
            break
        case MUSIC_EVENTS_SUCCESS:
            draft.musicEventsData = payload
            draft.musicEventsDataLoading = false
            break
    }
}, initialState)

async function wixRequest({ dispatch, wixCollection, loadingVar, failVar, successVar, parser }) {
    let response
    dispatch(createAction(loadingVar, true))
    
    try {
        response = await loadData(wixCollection)
    } catch (error) {
        dispatch(createAction(failVar, error.message))
    }

    dispatch(createAction(successVar, parser(response)))
}

function parseSingleItemCollection(rawData) {
    const data = rawData.dataItems[0].data
    Object.keys(data).forEach(key => {
        data[key] = processWixImgURL(data[key])
    })
    return data
}

function sortByField(a, b) {
    return a.sortOrder - b.sortOrder
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

export function fetchNavbarData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'navbar-links',
            loadingVar: NAVBAR_LOADING,
            failVar: NAVBAR_FAIL,
            successVar: NAVBAR_SUCCESS,
            parser: parseNavbarItems
        })
    }
}

export function fetchFooterData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'footer',
            loadingVar: FOOTER_LOADING,
            failVar: FOOTER_FAIL,
            successVar: FOOTER_SUCCESS,
            parser: parseSingleItemCollection
        })
    }
}

export function fetchHomepageData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'homepage',
            loadingVar: HOMEPAGE_LOADING,
            failVar: HOMEPAGE_FAIL,
            successVar: HOMEPAGE_SUCCESS,
            parser: parseSingleItemCollection
        })
    }
}

export function fetchSoftwareData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'software',
            loadingVar: SOFTWARE_LOADING,
            failVar: SOFTWARE_FAIL,
            successVar: SOFTWARE_SUCCESS,
            parser: parseSingleItemCollection
        })
    }
}

export function fetchSoftwareResumeData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'softwareResume',
            loadingVar: SOFTWARE_RESUME_LOADING,
            failVar: SOFTWARE_RESUME_FAIL,
            successVar: SOFTWARE_RESUME_SUCCESS,
            parser: parseSingleItemCollection
        })
    }
}

export function fetchSoftwareTechnologiesData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'softwareTechnologies',
            loadingVar: SOFTWARE_TECHNOLOGIES_LOADING,
            failVar: SOFTWARE_TECHNOLOGIES_FAIL,
            successVar: SOFTWARE_TECHNOLOGIES_SUCCESS,
            parser: parseSingleItemCollection
        })
    }
}

export function fetchMusicData() {
    return async (dispatch) => {
        await wixRequest({
            dispatch,
            wixCollection: 'music',
            loadingVar: MUSIC_LOADING,
            failVar: MUSIC_FAIL,
            successVar: MUSIC_SUCCESS,
            parser: parseSingleItemCollection
        })
    }
}