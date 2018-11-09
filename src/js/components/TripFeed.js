import * as React from 'react'
import styled from 'styled-components'

import TripItem from './TripItem'
import RectangularButton from './RectangularButton'
import MapOverview from './MapOverview'

import mock from '../mocks/mock'
import copy from '../copy'

const TripFeedContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const TripFeedMapWrapper = styled.div`
  width: 100%;
  height: 40%;
`

const TripFeedContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`

class TripFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
  }

  render() {
    const { tripId } = this.props.match.params
    const { createTripButtonText } = copy.tripFeed
    return (
      <TripFeedContainer>
        <TripFeedMapWrapper>
          <MapOverview />
        </TripFeedMapWrapper>
        <TripFeedContent>
          {Object.keys(mock).map(id => (
            <TripItem
              key={id}
              name={mock[id].name}
              startDate={mock[id].startDate}
              endDate={mock[id].endDate}
            />
          ))}
        </TripFeedContent>
        <RectangularButton primary>{createTripButtonText}</RectangularButton>
      </TripFeedContainer>
    )
  }
}

export default TripFeed
