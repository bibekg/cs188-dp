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
  padding: 20px 0 20px 0;
  border-bottom: 1px solid black;
`

const TripIconWrapper = styled.div`
  padding: 5px;
  margin: 0 5px 0 5px;
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
  flex-wrap: wrap;
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
    </TripDescriptionContainer>
    <TripActionsContainer>
      <FontAwesomeIcon icon={faFileAudio} size="2x" />
      <FontAwesomeIcon icon={faImage} size="2x" />
      <FontAwesomeIcon icon={faScroll} size="2x" />
      <FontAwesomeIcon icon={faMapPin} size="2x" />
    </TripActionsContainer>
  </TripItemContainer>
)

export default TripItem
