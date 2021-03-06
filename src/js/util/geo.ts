import { Trip } from '../type-defs/Trip'
import { LocationDetails, MediaItem } from '../type-defs/MediaItem'

const averageCoord = (media: MediaItem[], type: 'lat' | 'lng') => {
  if (!media) return null
  const mediaWithLocation = media.filter(
    medium => medium.location && medium.location.lat && medium.location.lng
  )
  return (
    mediaWithLocation
      .map(medium => medium.location && medium.location[type])
      .reduce<number>((acc, val) => (val ? acc + val : acc), 0) /
    mediaWithLocation.length
  )
}

export const averageTripLocation = (trip: Trip) =>
  trip.media
    ? {
        lat: averageCoord(trip.media, 'lat'),
        lng: averageCoord(trip.media, 'lng')
      }
    : null

// Converts a degrees-minutes-seconds representation to decimal
// e.g. [38, 5, 42.86] => 38.095284
export const dmsToDecimal = (dms: number[]) =>
  dms.reduce((acc, val, i) => acc + val / Math.pow(60, i), 0)
