export enum MediaItemType {
  Image,
  Note
}

export class LocationDetails {
  lat: number
  lng: number
  name: string
}

export class MediaItemLink {
  type: MediaItemType
  id: string
}

export class MediaItem {
  id: string
  dateTime: Date
  type: MediaItemType
  location?: LocationDetails
  links?: MediaItemLink[]
  description?: string
}

export class NoteMediaItem extends MediaItem {
  type: MediaItemType.Note
  content: string
}

export class ImageMediaItem extends MediaItem {
  type: MediaItemType.Image
  src: string
}

export type MediaType = NoteMediaItem | ImageMediaItem
