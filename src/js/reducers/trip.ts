import * as TYPES from '../actions/types'
import { Trip } from '../type-defs/Trip'
import produce from 'immer'

const DEFAULT_TRIP_STATE: Trip[] = []

const tripReducer = (state = DEFAULT_TRIP_STATE, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case TYPES.GET_TRIPS_SUCCESS: {
        draft.splice(0, draft.length)
        draft.push(...action.payload)
        break
      }
      case TYPES.CREATE_TRIP_SUCCESS: {
        draft.push(action.payload)
        break
      }
      case TYPES.CREATE_MEDIUM_SUCCESS: {
        const { trip, medium } = action.payload
        const currTrip = draft.find(t => t.id === trip.id)
        if (currTrip) {
          currTrip.media.push(medium)
        }
        break
      }

      case TYPES.UPDATE_MEDIUM_SUCCESS: {
        const { trip, medium } = action.payload
        const currTrip = draft.find(t => t.id === trip.id)
        if (currTrip) {
          currTrip.media = [
            ...currTrip.media.filter(m => m.id !== medium.id),
            medium
          ]
        }
        break
      }
    }
  })
}

export default tripReducer
