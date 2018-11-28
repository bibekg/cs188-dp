import { fireDb } from '../firebase'

/**
 * @name createTrip
 * @param {object} trip should contain at least an id property
 */
export const createTrip = trip => async (dispatch, getState) => {
  await fireDb
    .collection('trips')
    .doc(trip.id)
    .set(trip)
}
