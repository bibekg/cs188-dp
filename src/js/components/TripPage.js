import React from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import MapOverview from './MapOverview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import mock from '../mocks/mock'
import { colors } from '../styles'

const TripPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100wh;
  height: 100vh;

  > * {
    margin-bottom: 20px;
  }
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

const TripPage = props => {
  const { tripId } = props.match.params
  const trip = mock[tripId]

  return (
    <TripPageContainer>
      <SearchBar placeholder={'A Splendid Summer on Saturn'} />
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
