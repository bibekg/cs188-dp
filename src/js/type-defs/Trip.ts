import { MediaItem, MediaItemType } from './MediaItem'
import tripReducer from '../reducers/trip'

export class Trip {
  id: string
  name?: string
  startDate?: Date
  endDate?: Date
  media: MediaItem[] = []

  static default = () => ({
    media: []
  })
}
