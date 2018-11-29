import { Trip } from '../type-defs/Trip'
import { LocationDetails, MediaItem } from '../type-defs/MediaItem'

const averageCoord = (media: MediaItem[], type: 'lat' | 'lng') =>
  media
    ? media
        .map(medium => medium.location && medium.location[type])
        .reduce<number>((acc, val) => (val ? acc + val : acc), 0) / media.length
    : null

export const averageTripLocation = (trip: Trip) =>
  trip.media
    ? {
        lat: averageCoord(trip.media, 'lat'),
        lng: averageCoord(trip.media, 'lng')
      }
    : null
