import * as TYPES from '../actions/types'

const DEFAULT_TRIP_STATE = []

const tripReducer = (state = DEFAULT_TRIP_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_TRIP:
    case TYPES.CREATE_TRIP:
    case TYPES.ADD_MEDIA:
    case TYPES.UPDATE_TRIP:
    default:
      return state
  }
}

export default tripReducer
