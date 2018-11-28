import { fireDb } from '../firebase'
import { Trip } from '../type-defs/Trip'
import * as TYPES from './types'

export const createTripSuccess = (trip: Trip) => ({
  type: TYPES.CREATE_TRIP,
  payload: trip
})

/**
 * @name createTrip
 * @param {object} trip should contain at least an id property
 */
export const createTrip = (trip: Trip) => async (dispatch, getState) => {
  await fireDb
    .collection('trips')
    .doc(trip.id)
    .set(trip)
  dispatch(createTripSuccess(trip))
}
