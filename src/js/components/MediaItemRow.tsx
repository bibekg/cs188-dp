import * as React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote, faMapPin } from '@fortawesome/free-solid-svg-icons'
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
import { rgba } from 'polished'

const ThumbnailWrapper = styled.div`
  font-size: 12px;
  color: ${props => props.color || colors.mostlyBlack};
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ImageContainer = styled(Container)`
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  height: 100px;
`

const NoteContainer = styled(Container)`
  padding: 10px;
`

const ImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${rgba(colors.black, 0.6)};
`

const Media = styled.div`
  font-size: ${fonts.medium};
  font-weight: bold;
`

const Label = styled(Media)`
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

const MediaItemRow = (props: PropsType) => {
  const { mediaItem } = props

  const renderers: {
    [mit: number]: (mi: any) => React.ReactElement<typeof Container>
  } = {
    [MediaItemType.Image]: (imageMedium: ImageMediaItem) => (
      <ImageContainer image={imageMedium.src}>
        <ImageOverlay>
          <Label>
            <Text bold color={colors.white}>
              {imageMedium.caption || 'Uncaptioned photo'}
            </Text>
            <Text color={colors.white}>
              {dateFormat(imageMedium.dateTime, 'm/d/yy h:MM tt')}
            </Text>
            {imageMedium.location && (
              <ThumbnailWrapper color={colors.white}>
                <FontAwesomeIcon icon={faMapPin} />
              </ThumbnailWrapper>
            )}
          </Label>
        </ImageOverlay>
      </ImageContainer>
    ),
    [MediaItemType.Note]: (noteMedium: NoteMediaItem) => (
      <NoteContainer>
        <Label>
          <Text bold>Note: {noteMedium.title}</Text>
          <Text>{dateFormat(noteMedium.dateTime, 'm/d/yy h:MM tt')}</Text>

          <ThumbnailWrapper color={colors.mostlyBlack}>
            <FontAwesomeIcon icon={faStickyNote} />
            {noteMedium.location && <FontAwesomeIcon icon={faMapPin} />}
          </ThumbnailWrapper>
        </Label>
      </NoteContainer>
    )
  }

  const renderer = renderers[mediaItem.type]

  return <div>{(renderers[mediaItem.type] || (() => null))(mediaItem)}</div>
}

export default MediaItemRow
