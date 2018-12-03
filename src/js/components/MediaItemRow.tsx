import * as React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'

import Text from '../components/Text'
import { colors } from '../styles/index'
import {
  MediaItemType,
  MediaItem,
  NoteMediaItem,
  ImageMediaItem
} from '../type-defs/MediaItem'

import { fonts } from '../styles/index'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 70px;

  & > *:first-child {
    width: 70px;
    flex-shrink: 0;
  }
`

const Media = styled.div`
  font-size: ${fonts.medium};
  font-weight: bold;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const Label = styled(Media)`
  margin-left: 10px;
  text-align: left;
  width: 100%;
  height: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

interface PropsType {
  mediaItem: MediaItem
}

const Memory = (props: PropsType) => {
  const { mediaItem } = props

  const renderers: {
    [mit: number]: (mi: any) => React.ReactElement<typeof Container>
  } = {
    [MediaItemType.Image]: (imageMedium: ImageMediaItem) => (
      <Container>
        <ImageWrapper>
          <Image src={imageMedium.src} alt={imageMedium.description} />
        </ImageWrapper>
        <Label>
          <Text bold>{imageMedium.description || 'Uncaptioned photo'}</Text>
          <Text>{dateFormat(imageMedium.dateTime, 'm/d/yy h:MM tt')}</Text>
        </Label>
      </Container>
    ),
    [MediaItemType.Note]: (noteMedium: NoteMediaItem) => (
      <Container>
        <ImageWrapper>
          <FontAwesomeIcon icon={faStickyNote} size="2x" />
        </ImageWrapper>
        <Label>
          <Text bold>{noteMedium.title}</Text>
          <Text>{dateFormat(noteMedium.dateTime, 'm/d/yy h:MM tt')}</Text>
        </Label>
      </Container>
    )
  }

  const renderer = renderers[mediaItem.type]

  return <div>{(renderers[mediaItem.type] || (() => null))(mediaItem)}</div>
}

export default Memory
