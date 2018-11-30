import { MediaItem } from './MediaItem'

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
