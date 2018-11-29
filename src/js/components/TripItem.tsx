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

const TripItem = props => (
  <TripItemContainer>
    <TripIconWrapper>
      <Link to={`/trip/${props.id}/view`}>
        <FontAwesomeIcon icon={faPlayCircle} size="3x" color={colors.brown} />
      </Link>
    </TripIconWrapper>
    <TripDescriptionContainer>
      <TripName>{props.name}</TripName>
      <TripDate>
        {props.startDate.getMonth() + 1}/{props.startDate.getDate()}/
        {props.startDate.getFullYear()} - {props.endDate.getMonth() + 1}/
        {props.endDate.getDate()}/{props.endDate.getFullYear()}
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

export default TripItem
