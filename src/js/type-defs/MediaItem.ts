export enum MediaItemType {
  Image = 'photo',
  Note = 'note'
}

export interface LocationDetails {
  lat: number
  lng: number
  name?: string
}

export interface MediaItemLink {
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
