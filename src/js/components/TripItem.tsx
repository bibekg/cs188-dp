import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlayCircle,
  faFileAudio,
  faImage,
  faScroll,
  faMapPin
} from '@fortawesome/free-solid-svg-icons'

import { colors } from '../styles/index'
import { Trip } from '../type-defs/Trip'

const TripItemContainer = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid ${colors.black};

  > *:not(:first-child) {
    margin-left: 20px;
  }
`

const TripIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  flex-direction: row;
  max-width: 100px;
  flex-wrap: wrap;
  align-items: center;

  > * {
    margin: 0 5px;
    max-width: 15px;
    text-align: center;
  }
`

interface PropsType {
  trip: Trip
}

const TripItem = (props: PropsType) => {
  const { id, name, startDate, endDate } = props.trip
  return (
    <TripItemContainer>
      <TripIconWrapper>
        <Link to={`/trip/${id}/view`}>
          <FontAwesomeIcon icon={faPlayCircle} size="3x" color={colors.brown} />
        </Link>
      </TripIconWrapper>
      <TripDescriptionContainer>
        <TripName>{name}</TripName>
        <TripDate>
          {startDate.getMonth() + 1}/{startDate.getDate()}/
          {startDate.getFullYear()} - {endDate.getMonth() + 1}/
          {endDate.getDate()}/{endDate.getFullYear()}
        </TripDate>
        <TripActionsContainer>
          <FontAwesomeIcon icon={faFileAudio} size="1x" />
          <FontAwesomeIcon icon={faImage} size="2x" />
          <FontAwesomeIcon icon={faScroll} size="2x" />
          <FontAwesomeIcon icon={faMapPin} size="1x" />
        </TripActionsContainer>
      </TripDescriptionContainer>
    </TripItemContainer>
  )
}

export default TripItem
