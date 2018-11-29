import uuidv1 from 'uuid/v1'

import { fireDb } from '../firebase'
import { Trip } from '../type-defs/Trip'
import * as TYPES from './types'
import { consolidateStreamedStyles } from 'styled-components'

export const createTripSuccess = (trip: Trip) => ({
  type: TYPES.CREATE_TRIP,
  payload: trip
})

export const getTripsSuccess = (trips: Trip[]) => ({
  type: TYPES.GET_TRIPS_SUCCESS,
  payload: trips
})

/**
 * @name createTrip
 * @param {object} trip should contain at least an id property
 */
export const createTrip = (trip: Trip) => async (dispatch: any) => {
  const response = await fireDb
    .collection('trips')
    .doc(trip.id)
    .set(trip)

  dispatch(createTripSuccess(trip))
}

export const getTrips = () => async (dispatch: any, getState: any) => {
  const querySnapshot = await fireDb.collection('trips').get()
  const trips: Trip[] = querySnapshot.docs.map(doc => doc.data()).map(
    tripObject =>
      ({
        ...tripObject,
        startDate: new Date(tripObject.startDate.seconds * 1000),
        endDate: new Date(tripObject.endDate.seconds * 1000)
      } as Trip)
  )

  dispatch(getTripsSuccess(trips))
}
