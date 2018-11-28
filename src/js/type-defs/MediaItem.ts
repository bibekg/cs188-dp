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
  type: string
  id: string
}

export class MediaItem {
  id: string
  dateTime: Date
  type: MediaItemType
  location: LocationDetails
  links: MediaItemLink[]
}

export class NoteMediaItem extends MediaItem {
  content: string
}

export class ImageMediaItem extends MediaItem {
  src: string
  description: string
}

export type MediaType = NoteMediaItem | ImageMediaItem
