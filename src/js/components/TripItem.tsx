import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faStickyNote,
  faMapPin
} from '@fortawesome/free-solid-svg-icons'

import Text from './Text'
import { colors } from '../styles/index'
import { Trip } from '../type-defs/Trip'
import { MediaItemType } from '../type-defs/MediaItem'

const TripItemContainer = styled.div`
  * {
    text-decoration: none;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  > *:not(:first-child) {
    margin-left: 20px;
  }
`

const TripPreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60px;
  height: 60px;
  & > * {
    width: 50%;
    height: 50%;
    padding: 1px;
    border: 1px solid ${colors.lightGrey};
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`

const TripDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TripName = styled.div`
  font-weight: bold;
`

const TripDate = styled.div`
  font-style: italic;
`

const TripActionsContainer = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
  max-width: 100px;
  flex-wrap: wrap;
  align-items: center;
  color: ${colors.darkGrey};
  > * {
    margin: 0 5px;
    max-width: 15px;
    text-align: center;
  }
`

interface PropsType {
  trip: Trip
}

const shouldShowPin = (trip: Trip) =>
  trip.media && trip.media.find(medium => medium.location != null)

const shouldShowPhotoIcon = (trip: Trip) =>
  trip.media && trip.media.find(medium => medium.type === MediaItemType.Image)

const shouldShowScroll = (trip: Trip) =>
  trip.media &&
  trip.media.find(
    medium =>
      medium.type === MediaItemType.Note ||
      (medium.type === MediaItemType.Image && medium.description != null)
  )

const TripItem = (props: PropsType) => {
  const { trip } = props
  const { id, name, startDate, endDate } = trip

  const tripImages = trip.media.reduce<string[]>((acc, medium) => {
    if (medium.type === MediaItemType.Image && medium.src) {
      acc.push(medium.src)
    }
    return acc
  }, [])

  return (
    <Link to={`/trip/${trip.id}/edit`} style={{ textDecoration: 'none' }}>
      <TripItemContainer>
        <TripDescriptionContainer>
          <TripName>
            <Text bold>{name}</Text>
          </TripName>
          <TripDate>
            <Text>
              {startDate.getMonth() + 1}/{startDate.getDate()}/
              {startDate.getFullYear()} - {endDate.getMonth() + 1}/
              {endDate.getDate()}/{endDate.getFullYear()}
            </Text>
          </TripDate>
          <TripActionsContainer>
            {shouldShowPhotoIcon(props.trip) && (
              <FontAwesomeIcon icon={faCamera} size="2x" />
            )}
            {shouldShowScroll(props.trip) && (
              <FontAwesomeIcon icon={faStickyNote} size="2x" />
            )}
            {shouldShowPin(props.trip) && (
              <FontAwesomeIcon icon={faMapPin} size="1x" />
            )}
          </TripActionsContainer>
        </TripDescriptionContainer>
        {tripImages.length > 0 && (
          <TripPreviewContainer>
            {tripImages.slice(0, 4).map(image => (
              <div key={image}>
                <img src={image} />
              </div>
            ))}
          </TripPreviewContainer>
        )}
      </TripItemContainer>
    </Link>
  )
}

export default TripItem
