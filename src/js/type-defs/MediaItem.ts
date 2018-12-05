export enum MediaItemType {
  Image,
  Note
}

export class LocationDetails {
  lat: number = 0
  lng: number = 0
  name?: string
}

export class MediaItemLink {
  type: MediaItemType
  id: string
}

export interface BaseMediaItem {
  id: string
  dateTime: Date
  type: MediaItemType
  location?: LocationDetails
  links?: MediaItemLink[]
}

export interface NoteMediaItem extends BaseMediaItem {
  title: string
  type: MediaItemType.Note
  content: string
}

export interface ImageMediaItem extends BaseMediaItem {
  type: MediaItemType.Image
  src: string
  caption?: string
  description?: string
}

export type MediaItem = NoteMediaItem | ImageMediaItem
