import * as React from 'react'
import styled from 'styled-components'
import MapOverview from './MapOverview'
import Memory from './Memory'
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

const TripPageContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const TripPageAddMemory = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  width: 100%;
`

const TripPageAddButton = styled.div`
  padding: 15px 15px;
  font-family: 'sans-serif';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.8px;
  color: ${colors.white};
  background-color: ${colors.green};
  flex-grow: 1;
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

  return (
    <TripPageContainer>
      <TitleBar>
        <Text medium bold color={colors.white}>
          {trip.name}
        </Text>
      </TitleBar>
      <TripPageMapWrapper>
        <MapOverview />
      </TripPageMapWrapper>
      <TripPageContent>
        {trip &&
          trip.media.map(memory => <Memory key={memory.id} memory={memory} />)}
      </TripPageContent>
      <TripPageAddMemory>
        <TripPageAddButton
          onClick={() => console.log('Add photo')}
          color="green"
        >
          Add Photo
        </TripPageAddButton>
        <TripPageAddButton onClick={() => console.log('Add note')} color="blue">
          Add Note
        </TripPageAddButton>
      </TripPageAddMemory>
    </TripPageContainer>
  )
}

export default TripPage