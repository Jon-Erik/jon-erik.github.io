import { produce } from 'immer'
import createAction from './createAction'
import { client as prismicClient } from '../services/prismic'

export const NAVBAR_LOADING = 'NAVBAR_LOADING'
export const NAVBAR_SUCCESS = 'NAVBAR_SUCCESS'
export const NAVBAR_FAIL = 'NAVBAR_FAIL'

export const FOOTER_LOADING = 'FOOTER_LOADING'
export const FOOTER_SUCCESS = 'FOOTER_SUCCESS'
export const FOOTER_FAIL = 'FOOTER_FAIL'

export const HOMEPAGE_LOADING = 'HOMEPAGE_LOADING'
export const HOMEPAGE_SUCCESS = 'HOMEPAGE_SUCCESS'
export const HOMEPAGE_FAIL = 'HOMEPAGE_FAIL'

export const CONTACT_LOADING = 'CONTACT_LOADING'
export const CONTACT_SUCCESS = 'CONTACT_SUCCESS'
export const CONTACT_FAIL = 'CONTACT_FAIL'

export const MUSIC_LOADING = 'MUSIC_LOADING'
export const MUSIC_SUCCESS = 'MUSIC_SUCCESS'
export const MUSIC_FAIL = 'MUSIC_FAIL'

export const MUSIC_EVENTS_ROOT_LOADING = 'MUSIC_EVENTS_ROOT_LOADING'
export const MUSIC_EVENTS_ROOT_SUCCESS = 'MUSIC_EVENTS_ROOT_SUCCESS'
export const MUSIC_EVENTS_ROOT_FAIL = 'MUSIC_EVENTS_ROOT_FAIL'

export const MUSIC_EVENTS_LOADING = 'MUSIC_EVENTS_LOADING'
export const MUSIC_EVENTS_SUCCESS = 'MUSIC_EVENTS_SUCCESS'
export const MUSIC_EVENTS_FAIL = 'MUSIC_EVENTS_FAIL'

export const MUSIC_RESOURCES_ROOT_LOADING = 'MUSIC_RESOURCES_ROOT_LOADING'
export const MUSIC_RESOURCES_ROOT_SUCCESS = 'MUSIC_RESOURCES_ROOT_SUCCESS'
export const MUSIC_RESOURCES_ROOT_FAIL = 'MUSIC_RESOURCES_ROOT_FAIL'

export const MUSIC_RESOURCES_LOADING = 'MUSIC_RESOURCES_LOADING'
export const MUSIC_RESOURCES_SUCCESS = 'MUSIC_RESOURCES_SUCCESS'
export const MUSIC_RESOURCES_FAIL = 'MUSIC_RESOURCES_FAIL'

export const MUSIC_BLOG_LOADING = 'MUSIC_BLOG_LOADING'
export const MUSIC_BLOG_SUCCESS = 'MUSIC_BLOG_SUCCESS'
export const MUSIC_BLOG_FAIL = 'MUSIC_BLOG_FAIL'

export const MUSIC_RESUME_LOADING = 'MUSIC_RESUME_LOADING'
export const MUSIC_RESUME_SUCCESS = 'MUSIC_RESUME_SUCCESS'
export const MUSIC_RESUME_FAIL = 'MUSIC_RESUME_FAIL'

export const SOFTWARE_LOADING = 'SOFTWARE_LOADING'
export const SOFTWARE_SUCCESS = 'SOFTWARE_SUCCESS'
export const SOFTWARE_FAIL = 'SOFTWARE_FAIL'

export const SOFTWARE_RESUME_LOADING = 'SOFTWARE_RESUME_LOADING'
export const SOFTWARE_RESUME_SUCCESS = 'SOFTWARE_RESUME_SUCCESS'
export const SOFTWARE_RESUME_FAIL = 'SOFTWARE_RESUME_FAIL'

export const SOFTWARE_TECH_LOADING = 'SOFTWARE_TECH_LOADING'
export const SOFTWARE_TECH_SUCCESS = 'SOFTWARE_TECH_SUCCESS'
export const SOFTWARE_TECH_FAIL = 'SOFTWARE_TECH_FAIL'

const initialState = {
  navbarData: [],
  navbarDataLoading: false,
  navbarDataError: '',
  footerData: {},
  footerDataLoading: false,
  footerDataError: '',
  homepageData: {},
  homepageDataLoading: false,
  homepageDataError: '',
  contactData: {},
  contactDataLoading: false,
  contactDataError: '',
  musicData: {},
  musicDataLoading: false,
  musicDataError: '',
  musicEventsRootData: {},
  musicEventsRootDataLoading: false,
  musicEventsRootDataError: '',
  musicEventsData: [],
  musicEventsDataLoading: false,
  musicEventsDataError: '',
  musicResourcesRootData: {},
  musicResourcesRootDataLoading: false,
  musicResourcesRootDataError: '',
  musicResourcesData: [],
  musicResourcesDataLoading: false,
  musicResourcesDataError: '',
  musicBlogRootData: {},
  musicBlogRootDataLoading: false,
  musicBlogRootDataError: '',
  musicResumeData: {},
  musicResumeDataLoading: false,
  musicResumeDataError: '',
  softwareData: {},
  softwareDataLoading: false,
  softwareDataError: '',
  softwareResumeData: {},
  softwareResumeDataLoading: false,
  softwareResumeDataError: '',
  softwareTechData: {},
  softwareTechDataLoading: false,
  softwareTechDataError: ''
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
      draft.homepageDataLoading = payload
      break
    case HOMEPAGE_FAIL:
      draft.homepageDataLoading = false
      draft.homepageDataError = payload
      break
    case HOMEPAGE_SUCCESS:
      draft.homepageData = payload
      draft.homepageDataLoading = false
      break
    case CONTACT_LOADING:
      draft.contactDataLoading = payload
      break
    case CONTACT_FAIL:
      draft.contactDataLoading = false
      draft.contactDataError = payload
      break
    case CONTACT_SUCCESS:
      draft.contactData = payload
      draft.contactDataLoading = false
      break
    case MUSIC_LOADING:
      draft.musicDataLoading = payload
      break
    case MUSIC_FAIL:
      draft.musicDataLoading = false
      draft.musicDataError = payload
      break
    case MUSIC_SUCCESS:
      draft.musicData = payload
      draft.musicDataLoading = false
      break
    case MUSIC_EVENTS_ROOT_LOADING:
      draft.musicEventsRootDataLoading = payload
      break
    case MUSIC_EVENTS_ROOT_FAIL:
      draft.musicEventsRootDataLoading = false
      draft.musicEventsRootDataError = payload
      break
    case MUSIC_EVENTS_ROOT_SUCCESS:
      draft.musicEventsRootData = payload
      draft.musicEventsRootDataLoading = false
      break
    case MUSIC_EVENTS_LOADING:
      draft.musicEventsDataLoading = payload
      break
    case MUSIC_EVENTS_FAIL:
      draft.musicEventsDataLoading = false
      draft.musicEventsDataError = payload
      break
    case MUSIC_EVENTS_SUCCESS:
      draft.musicEventsData = payload
      draft.musicEventsDataLoading = false
      break
    case MUSIC_RESOURCES_ROOT_LOADING:
      draft.musicResourcesRootDataLoading = payload
      break
    case MUSIC_RESOURCES_ROOT_FAIL:
      draft.musicResourcesRootDataLoading = false
      draft.musicResourcesRootDataError = payload
      break
    case MUSIC_RESOURCES_ROOT_SUCCESS:
      draft.musicResourcesRootData = payload
      draft.musicResourcesRootDataLoading = false
      break
    case MUSIC_RESOURCES_LOADING:
      draft.musicResourcesDataLoading = payload
      break
    case MUSIC_RESOURCES_FAIL:
      draft.musicResourcesDataLoading = false
      draft.musicResourcesDataError = payload
      break
    case MUSIC_RESOURCES_SUCCESS:
      draft.musicResourcesData = payload
      draft.musicResourcesDataLoading = false
      break
    case MUSIC_BLOG_LOADING:
      draft.musicBlogRootDataLoading = payload
      break
    case MUSIC_BLOG_FAIL:
      draft.musicBlogRootDataLoading = false
      draft.musicBlogRootDataError = payload
      break
    case MUSIC_BLOG_SUCCESS:
      draft.musicBlogRootData = payload
      draft.musicBlogRootDataLoading = false
      break
    case MUSIC_RESUME_LOADING:
      draft.musicResumeDataLoading = payload
      break
    case MUSIC_RESUME_FAIL:
      draft.musicResumeDataLoading = false
      draft.musicResumeDataError = payload
      break
    case MUSIC_RESUME_SUCCESS:
      draft.musicResumeData = payload
      draft.musicResumeDataLoading = false
      break
    case SOFTWARE_LOADING:
      draft.softwareDataLoading = payload
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
      draft.softwareResumeDataLoading = payload
      break
    case SOFTWARE_RESUME_FAIL:
      draft.softwareResumeDataLoading = false
      draft.softwareResumeDataError = payload
      break
    case SOFTWARE_RESUME_SUCCESS:
      draft.softwareResumeData = payload
      draft.softwareResumeDataLoading = false
      break
    case SOFTWARE_TECH_LOADING:
      draft.softwareTechDataLoading = payload
      break
    case SOFTWARE_TECH_FAIL:
      draft.softwareTechDataLoading = false
      draft.softwareTechDataError = payload
      break
    case SOFTWARE_TECH_SUCCESS:
      draft.softwareTechData = payload
      draft.softwareTechDataLoading = false
      break
  }
}, initialState)

async function prismicReq({
  dispatch,
  dataType,
  loadingVar,
  failVar,
  successVar,
  reqType,
  parser
}) {
  let response
  dispatch(createAction(loadingVar, true))

  try {
    if (reqType === 'single') {
      response = await prismicClient.getSingle(dataType)
    } else if (reqType === 'allByType') {
      response = await prismicClient.getAllByType(dataType)
    }
  } catch (error) {
    dispatch(createAction(failVar, error.message))
  }

  //console.log({dataType, response})

  dispatch(createAction(successVar, parser(response)))
}

function parseSingleItemCollection(rawData) {
  return rawData.data
}

function parseMultiItemCollection(rawData) {
  return rawData.map((item) => item.data)
}

function sortByField(a, b) {
  return a.sort_order - b.sort_order
}

function parseNavLinks(rawData) {
  const arr = rawData.map((i) => i.data)

  const parsed = arr.filter((i) => i.nav_level == 1).sort(sortByField)
  parsed.forEach((p) => {
    p.children = arr
      .filter((i) => i.parent == p.title && i.nav_level == 2)
      .sort(sortByField)
  })

  return parsed
}

export function fetchNavbarData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'allByType',
      dataType: 'nav_links',
      loadingVar: NAVBAR_LOADING,
      failVar: NAVBAR_FAIL,
      successVar: NAVBAR_SUCCESS,
      parser: parseNavLinks
    })
  }
}

export function fetchFooterData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'footer',
      loadingVar: FOOTER_LOADING,
      failVar: FOOTER_FAIL,
      successVar: FOOTER_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchHomepageData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'homepage',
      loadingVar: HOMEPAGE_LOADING,
      failVar: HOMEPAGE_FAIL,
      successVar: HOMEPAGE_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchContactData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'contact',
      loadingVar: CONTACT_LOADING,
      failVar: CONTACT_FAIL,
      successVar: CONTACT_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchMusicData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'music_root',
      loadingVar: MUSIC_LOADING,
      failVar: MUSIC_FAIL,
      successVar: MUSIC_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchMusicEventsData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'allByType',
      dataType: 'music_events',
      loadingVar: MUSIC_EVENTS_LOADING,
      failVar: MUSIC_EVENTS_FAIL,
      successVar: MUSIC_EVENTS_SUCCESS,
      parser: parseMultiItemCollection
    })
  }
}

export function fetchMusicEventsRootData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'music_events_root',
      loadingVar: MUSIC_EVENTS_ROOT_LOADING,
      failVar: MUSIC_EVENTS_ROOT_FAIL,
      successVar: MUSIC_EVENTS_ROOT_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchMusicResourcesData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'allByType',
      dataType: 'music_resource',
      loadingVar: MUSIC_RESOURCES_LOADING,
      failVar: MUSIC_RESOURCES_FAIL,
      successVar: MUSIC_RESOURCES_SUCCESS,
      parser: parseMultiItemCollection
    })
  }
}

export function fetchMusicResourcesRootData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'music_resources_root',
      loadingVar: MUSIC_RESOURCES_ROOT_LOADING,
      failVar: MUSIC_RESOURCES_ROOT_FAIL,
      successVar: MUSIC_RESOURCES_ROOT_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchMusicBlogRootData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'via_musicae_root',
      loadingVar: MUSIC_BLOG_LOADING,
      failVar: MUSIC_BLOG_FAIL,
      successVar: MUSIC_BLOG_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchMusicResumeData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'music_resume',
      loadingVar: MUSIC_RESUME_LOADING,
      failVar: MUSIC_RESUME_FAIL,
      successVar: MUSIC_RESUME_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchSoftwareData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'software_root',
      loadingVar: SOFTWARE_LOADING,
      failVar: SOFTWARE_FAIL,
      successVar: SOFTWARE_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchSoftwareResumeData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'software_resume',
      loadingVar: SOFTWARE_RESUME_LOADING,
      failVar: SOFTWARE_RESUME_FAIL,
      successVar: SOFTWARE_RESUME_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}

export function fetchSoftwareTechData() {
  return async (dispatch) => {
    await prismicReq({
      dispatch,
      reqType: 'single',
      dataType: 'software_technologies',
      loadingVar: SOFTWARE_TECH_LOADING,
      failVar: SOFTWARE_TECH_FAIL,
      successVar: SOFTWARE_TECH_SUCCESS,
      parser: parseSingleItemCollection
    })
  }
}
