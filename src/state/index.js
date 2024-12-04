import {
  combineReducers,
  applyMiddleware,
  compose,
  configureStore
} from 'redux'
import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import externalData, * as externalDataActions from './externalData'

const middleware = [thunk]

const reducer = combineReducers({
  externalData
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore(
  { reducer },
  composeEnhancers(applyMiddleware(...middleware))
)

export default store

export { externalDataActions as externalData }
