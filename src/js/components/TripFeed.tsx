import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import TripItem from './TripItem'
import RectangularButton from './RectangularButton'
import MapOverview from './MapOverview'
import Text from './Text'

import mock from '../mocks/mock'
import copy from '../copy'
import { colors } from '../styles'
import { Trip } from '../type-defs/Trip'
import { createTripSuccess } from '../actions'

const TitleBar = styled.div`
  background-color: ${colors.brown};
  ${Text} {
    color: white;
  }
  padding: 10px 0;
  text-align: center;
`

const TripFeedContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const TripFeedMapWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 40%;
`

const TripFeedContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`

interface PropsType {
  trips: Trip[]
}

class TripFeed extends React.Component<PropsType> {
  constructor(props: PropsType) {
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
        <TitleBar>
          <Text medium bold>
            Your Past Trips
          </Text>
        </TitleBar>
        <TripFeedMapWrapper>
          <MapOverview />
        </TripFeedMapWrapper>
        <TripFeedContent>
          {this.props.trips.map(trip => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </TripFeedContent>
        <Link to="/trip/new">
          <RectangularButton primary>{createTripButtonText}</RectangularButton>
        </Link>
      </TripFeedContainer>
    )
  }
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  null
)(TripFeed)
