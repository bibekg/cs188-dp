import { fireDb } from '../firebase'
import { Trip } from '../type-defs/Trip'
import { MediaItem } from '../type-defs/MediaItem'
import * as TYPES from './types'

export const createTripSuccess = (trip: Trip) => ({
  type: TYPES.CREATE_TRIP_SUCCESS,
  payload: trip
})

export const getTripsSuccess = (trips: Trip[]) => ({
  type: TYPES.GET_TRIPS_SUCCESS,
  payload: trips
})

export const addMediumSuccess = (medium: MediaItem, trip: Trip) => ({
  type: TYPES.CREATE_MEDIUM_SUCCESS,
  payload: {
    medium,
    trip
  }
})

export const updateMediumSuccess = (medium: MediaItem, trip: Trip) => ({
  type: TYPES.UPDATE_MEDIUM_SUCCESS,
  payload: {
    medium,
    trip
  }
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
        endDate: new Date(tripObject.endDate.seconds * 1000),
        media: tripObject.media.map((medium: any) => {
          const newMedium = { ...medium }
          if (newMedium.dateTime) {
            newMedium.dateTime = new Date(newMedium.dateTime.seconds * 1000)
          }
          return newMedium
        })
      } as Trip)
  )

  dispatch(getTripsSuccess(trips))
}

export const addMedium = (medium: MediaItem, trip: Trip) => async (
  dispatch: any
) => {
  const response = await fireDb
    .collection('trips')
    .doc(trip.id)
    .update({
      media: [...trip.media, medium]
    })

  dispatch(addMediumSuccess(medium, trip))
}

export const updateMedium = (medium: MediaItem, trip: Trip) => async (
  dispatch: any
) => {
  const response = await fireDb
    .collection('trips')
    .doc(trip.id)
    .update({
      media: [...trip.media.filter(m => m.id !== medium.id), medium]
    })

  dispatch(updateMediumSuccess(medium, trip))
}
