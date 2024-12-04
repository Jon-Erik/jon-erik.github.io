import { produce } from 'immer'
import createAction from './createAction'
import { client as prismicClient } from '../services/prismic'

export const NAVBAR_LOADING = 'NAVBAR_LOADING'
export const NAVBAR_SUCCESS = 'NAVBAR_SUCCESS'
export const NAVBAR_FAIL = 'NAVBAR_FAIL'

export const FOOTER_LOADING = 'FOOTER_LOADING'
export const FOOTER_SUCCESS = 'FOOTER_SUCCESS'
export const FOOTER_FAIL = 'FOOTER_FAIL'

const initialState = {
  navbarData: [],
  navbarDataLoading: false,
  navbarDataError: '',
  footerData: {},
  footerDataLoading: false,
  footerDataError: ''
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

  dispatch(createAction(successVar, parser(response)))
}

function parseSingleItemCollection(rawData) {
  return rawData.data
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
