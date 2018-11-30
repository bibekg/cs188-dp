import { MediaType } from './MediaItem'

export class Trip {
  id: string
  name?: string
  startDate?: Date
  endDate?: Date
  media: MediaType[] = []

  toObject() {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      media: this.media
    }
  }
}
