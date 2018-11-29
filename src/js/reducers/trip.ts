import * as TYPES from '../actions/types'
import { Trip } from '../type-defs/Trip'

const DEFAULT_TRIP_STATE: Trip[] = []

const tripReducer = (state = DEFAULT_TRIP_STATE, action: any) => {
  switch (action.type) {
    case TYPES.GET_TRIPS_SUCCESS:
      return action.payload
    case TYPES.GET_TRIP:
    case TYPES.CREATE_TRIP:
    case TYPES.ADD_MEDIA:
    case TYPES.UPDATE_TRIP:
    default:
      return state
  }
}

export default tripReducer
