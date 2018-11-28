// @flow

import { combineReducers } from 'redux'
import tripReducer from './trip'

export default combineReducers({
  trip: tripReducer
})
