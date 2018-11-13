import React from 'react'
import styled from 'styled-components'
import MapOverview from './MapOverview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Text from './Text'

import mock from '../mocks/mock'
import { colors } from '../styles'

const TripPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100wh;
  height: 100vh;
  text-align: center;
`

const TripPageMapWrapper = styled.div`
  position: relative;
  height: 40%;
  width: 100%;
`

const TripPageAddMemory = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`

const TitleBar = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  background-color: ${colors.brown};
`

const TripPage = props => {
  const { tripId } = props.match.params
  const trip = mock[tripId]

  const { title, startDate, endDate } = JSON.parse(
    window.localStorage.mockTrips
  )[0]

  return (
    <TripPageContainer>
      <TitleBar>
        <Text medium bold color={colors.white}>
          {title}
        </Text>
      </TitleBar>
      <TripPageMapWrapper>
        <MapOverview />
      </TripPageMapWrapper>
      <TripPageAddMemory>
        <FontAwesomeIcon icon={faPlusCircle} size="5x" color={colors.green} />
      </TripPageAddMemory>
    </TripPageContainer>
  )
}

export default TripPage
