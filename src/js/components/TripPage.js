import React from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import MapOverview from './MapOverview'

import mock from '../mocks/mock'

const TripPageContainer = styled.div`
  display: relative;

  > * {
    margin-bottom: 20px;
  }
`

const TripPage = props => {
  const { tripId } = props.match.params
  const trip = mock[tripId]

  return (
    <TripPageContainer>
      <SearchBar placeholder={'Untitled Trip'} />
      <MapOverview />
    </TripPageContainer>
  )
}

export default TripPage
