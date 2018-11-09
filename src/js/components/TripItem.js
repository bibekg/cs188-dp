import * as React from 'react'
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
  border-bottom: 1px solid black;

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
      <FontAwesomeIcon icon={faPlayCircle} size="3x" color={colors.blue} />
    </TripIconWrapper>
    <TripDescriptionContainer>
      <TripName>{props.name}</TripName>
      <TripDate>
        {props.startDate}-{props.endDate}
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
